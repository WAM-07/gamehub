import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="logo">
                    GAMEHUB
                </Link>

                <div className="nav-links">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/games">Browse</NavLink>
                    {user && <NavLink to="/profile">My Library</NavLink>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {user ? (
                        <>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {user.username}
                            </span>
                            <button onClick={onLogout} className="btn btn-ghost" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}>
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
