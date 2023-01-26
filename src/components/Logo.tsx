import styles from './Logo.module.css';
import logoIcon from '../assets/logo-icon.svg';

interface LogoProps {
    page: string;
}

export function Logo({ page }: LogoProps) {
    return (
        <div className={page === 'home' ? styles.wrapperHome : styles.wrapper}>
            <img src={logoIcon} alt='logo-icon' />
        </div>
    )
}