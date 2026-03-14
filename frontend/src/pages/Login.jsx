import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, user, error, setError } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/games');
        if (error) setError(null);
        // eslint-disable-next-line
    }, [user]);

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const ok = await login(formData);
        if (ok) navigate('/games');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="panel">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.25rem', background: 'linear-gradient(135deg,#fff,#0074e4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            GAMEHUB
                        </div>
                        <h2>Welcome back</h2>
                        <p className="subtitle">Sign in to access your library</p>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={onChange} required placeholder="you@email.com" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={onChange} required placeholder="••••••••" />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}>
                            Sign In
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
