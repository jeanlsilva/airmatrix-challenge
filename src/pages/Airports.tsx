import { useState } from 'react';
import { useQuery } from 'react-query';
import { Menu } from '../components/Menu';
import { getData } from '../services/getData';
import styles from './Stadiums.module.css';

interface SpecialProps {
    properties: {
        OBJECTID: number;
        NAME: string;
        OPERSTATUS: string;
        STATE: string;
        COUNTRY: string;
    }
}

export function Airports() {
    const [list, setList] = useState<SpecialProps[]>([]);
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className={styles.pagination}>
                                {/* 1. if current page is lower than 10, add reticences after 10th page 
                                    (1 2 3 [4] 5 6 7 8 9 10 ... last)
                                    2. if current page > 10 and < total - 10, add reticences to the all previous but the nearest prev and the
                                    first and all next but the nearest next and the last 
                                    (1 ... 26 [27] 28 ... last)
                                    3. if current page > 10 and total > total - 10, add reticences to all previous but the first and the nearest prev and next
                                    (1 ... 44 [45] 46)                                     
                                    */
                                    Array.from(Array(Math.ceil(list.length / resultsPerPage)).keys()).map((item, index) => (
                                        (currentPage >= 9 && currentPage < Math.ceil(list.length / resultsPerPage) - 8) ? //first case
                                            (index === 0 || //first
                                             index + 2 === currentPage || //next
                                             index === currentPage || // previous
                                             index + 1 === currentPage || // active
                                             index === (Math.ceil(list.length / resultsPerPage) - 1)) // last 
                                             ? (
                                                <span 
                                                    className={index + 1 === currentPage ? styles.active : undefined}
                                                    onClick={() => setCurrentPage(index + 1)}
                                                >
                                                    {item + 1}
                                                </span>
                                            ) : (index === currentPage - 3 || index === currentPage + 3) ? <span>...</span> : <></>
                                        : (currentPage < 9 ) ?  //second case
                                            (index < 10 || index === Math.ceil(list.length / resultsPerPage) - 1) ? (
                                                <span 
                                                    className={index + 1 === currentPage ? styles.active : undefined}
                                                    onClick={() => setCurrentPage(index + 1)}
                                                >
                                                    {item + 1}
                                                </span>
                                            ) : (index === 11) ? <span>...</span> : <></>
                                        : (currentPage >= Math.ceil(list.length / resultsPerPage) - 12) ? // third case
                                            (index === 0 || index > Math.ceil(list.length / resultsPerPage) - 11) ? (
                                                <span 
                                                    className={index + 1 === currentPage ? styles.active : undefined}
                                                    onClick={() => setCurrentPage(index + 1)}
                                                >
                                                    {item + 1}
                                                </span>
                                            ) : (index === 1) ? <span>...</span> : <></>
                                        : <></>
                                    ))
                                }
                            </div>
                        </>
                    ) : <p>Something else went wrong</p>
                }
            </main>
        </>
    )
}