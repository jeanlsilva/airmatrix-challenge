import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import styles from './Menu.module.css';
import { Hamburger } from 'phosphor-react';

interface MenuProps {
    page: string;
}

export function Menu({ page }: MenuProps) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    function toggleNavbar() {
        setIsNavbarOpen(!isNavbarOpen);
    }

    return (
        <header className={page !== 'home' ? styles.wrapper : undefined}>
            <div className={page === 'home' ? styles.headerHome : styles.header}>
                <Link to='/'><Logo page={page} /></Link>
                <div className={isNavbarOpen ? styles.open : undefined}>
                    <Link to='/airports' className={page === 'airports' ? styles.active : undefined}>Airports</Link>
                    <Link to='/stadiums' className={page === 'stadiums' ? styles.active : undefined}>Stadiums</Link>
                    <Link to='/special' className={page === 'special' ? styles.active : undefined}>Special Use Airspace</Link>
                </div>
            </div>
            <div className={styles.navbar}>
                <button onClick={toggleNavbar}><Hamburger size={50} /></button>
            </div>
        </header>
    )
}