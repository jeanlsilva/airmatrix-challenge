import { useState } from 'react';
import { useQuery } from 'react-query';
import { Menu } from '../components/Menu';
import { getData } from '../services/getData';
import styles from './Stadiums.module.css';

interface DataProps {
    properties: {
        OBJECTID: number;
        NAME: string;
        STATUS_CODE: string;
        CITY: string;
        STATE: string;
    }
}

export function Stadiums() {
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
            <Menu page='stadiums' />
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
                                        <td>Status</td>
                                        <td>Location</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(list.slice((resultsPerPage * (currentPage - 1)), (resultsPerPage * (currentPage - 1)) + resultsPerPage)).map(item => (
                                        <tr>
                                            <td>{item.properties.OBJECTID}</td>
                                            <td>{item.properties.NAME}</td>
                                            <td>{item.properties.STATUS_CODE}</td>
                                            <td>{`${item.properties.CITY}, ${item.properties.STATE}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className={styles.pagination}>
                                {Array.from(Array(Math.ceil(list.length / resultsPerPage)).keys()).map((item, index) => (
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
                                            // ellipsis before nearest previous and after nearest next
                                        ) : (index === currentPage - 3 || index === currentPage + 3) ? <span>...</span> : <></>
                                    : (currentPage < 9 ) ?  //second case
                                        // first 10 or the last
                                        (index < 10 || index === Math.ceil(list.length / resultsPerPage) - 1) ? (
                                            <span 
                                                className={index + 1 === currentPage ? styles.active : undefined}
                                                onClick={() => setCurrentPage(index + 1)}
                                            >
                                                {item + 1}
                                            </span>
                                            // ellipsis after the 10th
                                        ) : (index === 11) ? <span>...</span> : <></>
                                    : (currentPage >= Math.ceil(list.length / resultsPerPage) - 12) ? // third case
                                        // first or the last 10
                                        (index === 0 || index > Math.ceil(list.length / resultsPerPage) - 11) ? (
                                            <span 
                                                className={index + 1 === currentPage ? styles.active : undefined}
                                                onClick={() => setCurrentPage(index + 1)}
                                            >
                                                {item + 1}
                                            </span>
                                            // ellipsis after the first
                                        ) : (index === 1) ? <span>...</span> : <></>
                                    : <></>
                                ))}
                            </div>
                        </>
                    ) : <p>Something else went wrong</p>
                }
            </main>
        </>
    )
}