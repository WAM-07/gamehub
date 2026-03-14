import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [localError, setLocalError] = useState('');
    const { register, user, error, setError } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/games');
        if (error) setError(null);
        // eslint-disable-next-line
    }, [user]);

    const { username, email, password, confirmPassword } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLocalError('');
        if (password !== confirmPassword) { setLocalError('Passwords do not match'); return; }
        const ok = await register({ username, email, password });
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
                        <h2>Create account</h2>
                        <p className="subtitle">Join the community and publish your projects</p>
                    </div>

                    {(error || localError) && <div className="alert alert-error">{localError || error}</div>}

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={onChange} required placeholder="Choose a username" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={onChange} required placeholder="you@email.com" />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={onChange} required minLength="6" placeholder="••••••••" />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Confirm</label>
                                <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={onChange} required minLength="6" placeholder="••••••••" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}>
                            Create Account
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
