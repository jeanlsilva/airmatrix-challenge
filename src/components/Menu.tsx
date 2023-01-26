import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import styles from './Menu.module.css';

interface MenuProps {
    page: string;
}

export function Menu({ page }: MenuProps) {
    return (
        <header className={page !== 'home' ? styles.wrapper : undefined}>
            <div className={page === 'home' ? styles.headerHome : styles.header}>
                <Link to='/'><Logo page={page} /></Link>
                <Link to='/airports' className={page === 'airports' ? styles.active : undefined}>Airports</Link>
                <Link to='/stadiums' className={page === 'stadiums' ? styles.active : undefined}>Stadiums</Link>
                <Link to='/special' className={page === 'special' ? styles.active : undefined}>Special Use Airspace</Link>
            </div>
        </header>
    )
}