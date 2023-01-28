import styles from './Pagination.module.css';

interface PaginationProps {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    resultsPerPage: number;
    listLength: number;
}

export function Pagination({ currentPage, resultsPerPage, listLength, setCurrentPage}: PaginationProps) {
    return (
        <div className={styles.pagination}>
        {/* 1. if current page is lower than 10, add reticences after 10th page 
            (1 2 3 [4] 5 6 7 8 9 10 ... last)
            2. if current page > 10 and < total - 10, add reticences to the all previous but the nearest prev and the
            first and all next but the nearest next and the last 
            (1 ... 26 [27] 28 ... last)
            3. if current page > 10 and total > total - 10, add reticences to all previous but the first and the nearest prev and next
            (1 ... 44 [45] 46)                                     
            */
            Array.from(Array(Math.ceil(listLength / resultsPerPage)).keys()).map((item, index) => (
                (currentPage >= 9 && currentPage < Math.ceil(listLength / resultsPerPage) - 8) ? //first case
                    (index === 0 || //first
                     index + 2 === currentPage || //next
                     index === currentPage || // previous
                     index + 1 === currentPage || // active
                     index === (Math.ceil(listLength / resultsPerPage) - 1)) // last 
                     ? (
                        <span 
                            className={index + 1 === currentPage ? styles.active : undefined}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {item + 1}
                        </span>
                    ) : (index === currentPage - 3 || index === currentPage + 3) ? <span>...</span> : <></>
                : (currentPage < 9 ) ?  //second case
                    (index < 10 || index === Math.ceil(listLength / resultsPerPage) - 1) ? (
                        <span 
                            className={index + 1 === currentPage ? styles.active : undefined}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {item + 1}
                        </span>
                    ) : (index === 11) ? <span>...</span> : <></>
                : (currentPage >= Math.ceil(listLength / resultsPerPage) - 12) ? // third case
                    (index === 0 || index > Math.ceil(listLength / resultsPerPage) - 11) ? (
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
    )
}