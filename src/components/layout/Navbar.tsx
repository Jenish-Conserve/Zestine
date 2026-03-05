import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import logoImg from '../../Images/logo/Group 174.png';

export default function Navbar() {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem 4rem',
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 50,
            background: 'grey'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logoImg} alt="Zestine Logo" style={{ height: '40px', objectFit: 'contain' }} />
            </Link>

            <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
            }}>
                Menu
                <FiMenu size={24} />
            </button>
        </nav>
    );
}
