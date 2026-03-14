import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GENRES = ['Action','Adventure','RPG','Simulation','Strategy','Sports','Puzzle','Other'];

const Profile = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userGames, setUserGames] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', genre: 'Action', developer: '', imageUrl: '' });
    const [msg, setMsg] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!loading && !user) navigate('/login');
        if (user) fetchMyGames();
        // eslint-disable-next-line
    }, [user, loading]);

    const fetchMyGames = async () => {
        try {
            const res = await axios.get('/api/v1/games');
            setUserGames(res.data.data.filter(g => g.user?._id === user._id));
        } catch { /* silent */ }
    };

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMsg({ type: '', text: '' });
        try {
            const res = await axios.post('/api/v1/games', form);
            setUserGames([res.data.data, ...userGames]);
            setForm({ title: '', description: '', genre: 'Action', developer: '', imageUrl: '' });
            setMsg({ type: 'success', text: '✓ Project published successfully!' });
        } catch (err) {
            setMsg({ type: 'error', text: err.response?.data?.error || 'Failed to publish' });
        }
    };

    const onDelete = async (id) => {
        if (!window.confirm('Delete this project?')) return;
        try {
            await axios.delete(`/api/v1/games/${id}`);
            setUserGames(userGames.filter(g => g._id !== id));
        } catch {
            setMsg({ type: 'error', text: 'Failed to delete' });
        }
    };

    if (loading || !user) return <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-secondary)' }}>Loading...</div>;

    return (
        <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Profile Header */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(0,116,228,0.1), rgba(137,87,229,0.1))',
                border: '1px solid rgba(0,116,228,0.15)',
                borderRadius: '10px',
                padding: '2rem',
                marginBottom: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                <div style={{
                    width: '64px', height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.6rem', fontWeight: 900, color: '#fff', flexShrink: 0
                }}>
                    {user.username[0].toUpperCase()}
                </div>
                <div>
                    <h2 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.25rem' }}>{user.username}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{user.email} · {userGames.length} project{userGames.length !== 1 ? 's' : ''} published</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Publish Form */}
                <div className="panel">
                    <h3 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Publish a Project</h3>
                    {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Title *</label>
                            <input type="text" className="form-control" name="title" value={form.title} onChange={onChange} required placeholder="My Awesome Game" />
                        </div>
                        <div className="form-group">
                            <label>Description *</label>
                            <textarea className="form-control" name="description" value={form.description} onChange={onChange} required rows="3" placeholder="What is this project about?" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label>Genre *</label>
                                <select className="form-control" name="genre" value={form.genre} onChange={onChange}>
                                    {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Developer / Team</label>
                                <input type="text" className="form-control" name="developer" value={form.developer} onChange={onChange} placeholder="Your name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Demo / Image URL (optional)</label>
                            <input type="url" className="form-control" name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="https://..." />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
                            Publish Project
                        </button>
                    </form>
                </div>

                {/* My Projects */}
                <div>
                    <h3 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>My Projects</h3>
                    {userGames.length === 0 ? (
                        <div className="panel" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📂</div>
                            <p>You haven't published anything yet.</p>
                            <p style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>Fill out the form to get started.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {userGames.map(game => (
                                <div key={game._id} className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{game.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{game.genre} · {game.developer || 'No developer set'}</div>
                                    </div>
                                    <button onClick={() => onDelete(game._id)} className="btn btn-danger" style={{ padding: '0.35rem 0.7rem', fontSize: '0.78rem' }}>
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
