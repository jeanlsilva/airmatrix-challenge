import { MapTrifold } from 'phosphor-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { MapModal } from '../components/MapModal';
import { Menu } from '../components/Menu';
import { Pagination } from '../components/Pagination';
import { getData } from '../services/getData';
import styles from './Stadiums.module.css';

interface Geometry {
    type: string;
    coordinates: number[][][];    
}

interface AirportProps {
    properties: {
        OBJECTID: number;
        NAME: string;
        OPERSTATUS: string;
        STATE: string;
        COUNTRY: string;
    };
    geometry: Geometry;
}

export function Airports() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<Geometry | undefined>(undefined);
    const [list, setList] = useState<AirportProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(50);
    const { isLoading, isError } = useQuery('getAirports', () => getData(
        `https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/US_Airport/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson`
    ), {
        onSuccess: (data) => {
            console.log(data);
            setList(data.features);
        },
        onError: (error) => console.log(error)
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
            <Menu page='airports' />
            <main>
                {
                    isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>Unable to load results</p>
                    ) : list ? (
                        <>
                            <div className={styles.resultsPerPage}>
                                Show
                                <select onChange={handleChangeResultsPerPage} value={resultsPerPage}>
                                    <option value='10'>10</option>
                                    <option value='50'>50</option>
                                    <option value='100'>100</option>
                                </select>
                                results per page
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Operational Status</td>
                                        <td>Location</td>
                                        <td>View Details</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(list.slice(
                                        (resultsPerPage * (currentPage - 1)), 
                                        (resultsPerPage * (currentPage - 1)) + resultsPerPage))
                                        .map(item => (
                                        <tr>
                                            <td>{item.properties.OBJECTID}</td>
                                            <td>{item.properties.NAME}</td>
                                            <td>{item.properties.OPERSTATUS}</td>
                                            <td>{`${item.properties.STATE} - ${item.properties.COUNTRY}`}</td>
                                            <td>
                                                <button onClick={() => {
                                                    setSelectedData(item.geometry);
                                                    setIsOpen(true);
                                                }}>
                                                    <MapTrifold size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        <Pagination
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            resultsPerPage={resultsPerPage}
                            listLength={list.length}
                        />
                        </>
                    ) : <p>Something else went wrong</p>
                }
            </main>
            {selectedData && <MapModal isOpen={isOpen} setIsOpen={setIsOpen} coordinates={selectedData?.coordinates} type='airports' />}
        </>
    )
}