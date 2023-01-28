import { useState } from 'react';
import { useQuery } from 'react-query';
import { Menu } from '../components/Menu';
import { Pagination } from '../components/Pagination';
import { getData } from '../services/getData';
import { MapModal } from '../components/MapModal';
import { DataProps, DataTable } from '../components/DataTable';

export function Stadiums() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<DataProps | undefined>(undefined);
    const [list, setList] = useState<DataProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(50);
    const { isLoading, isError } = useQuery('getStadiums', () => getData(
        `https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Stadiums/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson`
    ), {
        onSuccess: (data) => {
            console.log(data);
            setList(data.features);
        },
        onError: (error) => console.log(error),
        cacheTime: 60000
    });

    function handleChangeResultsPerPage(e: React.ChangeEvent<HTMLSelectElement>) {
        const newValue = Number(e.target.value);
        setResultsPerPage(newValue);
        // if current page is out of new range, go to last page
        if (Math.ceil(list.length / newValue) < currentPage) {
            setCurrentPage(Math.ceil(list.length / newValue))
        }            
    }

    return (
        <>
            <Menu page='stadiums' />
            <main>
                {
                    isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>Unable to load results</p>
                    ) : list ? (
                        <>
                            <DataTable
                                list={list}
                                resultsPerPage={resultsPerPage}
                                currentPage={currentPage}
                                setSelectedData={setSelectedData}
                                setIsOpen={setIsOpen}
                            />
                            <Pagination
                                setCurrentPage={setCurrentPage}
                                setResultsPerPage={setResultsPerPage}
                                currentPage={currentPage}
                                resultsPerPage={resultsPerPage}
                                listLength={list.length}
                            />
                        </>
                    ) : <p>Something else went wrong</p>
                }
            </main>
            <MapModal isOpen={isOpen} setIsOpen={setIsOpen} data={selectedData} type='stadiums' />
        </>
    )
}