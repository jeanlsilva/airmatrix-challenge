import { MapTrifold } from "phosphor-react";
import styles from './DataTable.module.css';

interface Geometry {
    type: string;
    coordinates: any;
}

interface Properties {
    OBJECTID: number;
    NAME: string;
    STATUS_CODE?: string;
    CITY?: string;
    STATE: string;
    OPERSTATUS?: string;
    COUNTRY?: string;
    TIMESOFUSE?: string;
}

export interface DataProps {
    type: 'Feature';
    properties: Properties;
    geometry: Geometry;
}

interface DataTableProps {
    list: DataProps[];
    resultsPerPage: number;
    currentPage: number;
    setSelectedData: React.Dispatch<React.SetStateAction<DataProps | undefined>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: 'airports' | 'stadiums' | 'special';
}

export function DataTable({ 
    list, 
    resultsPerPage, 
    currentPage, 
    setSelectedData, 
    setIsOpen,
    type
}: DataTableProps) {

    return (
        <div className={styles.dataTable}>
            <table>
                <thead>
                    <tr>
                        {Object.keys(list[0]?.properties || {}).map((item) => (
                            item === 'OBJECTID' ? <td key={item}>ID</td> :
                            item === 'NAME' ? <td key={item}>Name</td> :
                            item === 'OPERSTATUS' ? <td key={item}>Status</td> :
                            item === 'STATUS_CODE' ? <td key={item}>Status Code</td> : 
                            item === 'TIMESOFUSE' ? <td key={item}>Times of Use</td> : <></>
                        ))}
                        <td>Location</td>
                        <td>View Details</td>
                    </tr>
                </thead>
                <tbody>
                    {(list.slice(
                        (resultsPerPage * (currentPage - 1)), 
                        (resultsPerPage * (currentPage - 1)) + resultsPerPage))
                        .map(item => (
                            <tr key={item.properties.OBJECTID}>
                                <td>{item.properties.OBJECTID}</td>
                                <td>{item.properties.NAME}</td>
                                <td className={
                                    (item.properties.OPERSTATUS && item.properties.OPERSTATUS === 'OPERATIONAL') || 
                                    (item.properties.STATUS_CODE && item.properties.STATUS_CODE === 'Open') ? 
                                        styles.statusGreen : 
                                    item.properties.TIMESOFUSE ? styles.small : styles.statusRed
                                }>{item.properties?.OPERSTATUS || item.properties?.STATUS_CODE || item.properties?.TIMESOFUSE}</td>
                                <td className={type === 'special' ? styles.small : undefined}>{`${item.properties?.CITY ? item.properties.CITY + ',' : ''} 
                                    ${item.properties.STATE}
                                    ${item.properties?.COUNTRY ? ' - ' + item.properties.COUNTRY : ''}`}</td>
                                <td>
                                    <button onClick={() => {
                                        setSelectedData(item);
                                        setIsOpen(true);
                                    }}>
                                        <MapTrifold key={item.properties.OBJECTID} size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}