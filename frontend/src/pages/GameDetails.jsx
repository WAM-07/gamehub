import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MOCK_GAMES } from '../data/mockGames';

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ rating: 5, comment: '' });
    const [reviewMsg, setReviewMsg] = useState({ type: '', text: '' });

    useEffect(() => {
        // First check mock data
        const mock = MOCK_GAMES.find(g => g._id === id);
        if (mock) {
            setGame(mock);
            setLoading(false);
            return;
        }
        // Otherwise fetch from API
        const fetchData = async () => {
            try {
                const [gameRes, revRes] = await Promise.all([
                    axios.get(`/api/v1/games/${id}`),
                    axios.get(`/api/v1/games/${id}/reviews`)
                ]);
                setGame(gameRes.data.data);
                setReviews(revRes.data.data);
            } catch {
                setGame(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleReview = async e => {
        e.preventDefault();
        setReviewMsg({ type: '', text: '' });
        try {
            const res = await axios.post(`/api/v1/games/${id}/reviews`, form);
            setReviews([{ ...res.data.data, user: { username: 'You' } }, ...reviews]);
            setForm({ rating: 5, comment: '' });
            setReviewMsg({ type: 'success', text: 'Review posted!' });
        } catch (err) {
            setReviewMsg({ type: 'error', text: err.response?.data?.error || 'Failed to post review' });
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-secondary)' }}>Loading...</div>;
    if (!game) return (
        <div style={{ textAlign: 'center', padding: '6rem' }}>
            <h2>Game not found</h2>
            <Link to="/games" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Back to Browse</Link>
        </div>
    );

    return (
        <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Hero Banner */}
            <div style={{ position: 'relative', height: '420px', borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem' }}>
                <img
                    src={game.imageUrl || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200'}
                    alt={game.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,18,18,1) 0%, rgba(18,18,18,0.5) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: '2rem', left: '2.5rem' }}>
                    <Link to="/games" style={{ fontSize: '0.8rem', color: 'rgba(245,245,245,0.6)', marginBottom: '0.75rem', display: 'block' }}>
                        ← Browse
                    </Link>
                    <span style={{ display:'inline-block', padding:'0.25rem 0.7rem', background:'var(--accent-blue)', borderRadius:'4px', fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.75rem' }}>{game.genre}</span>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1 }}>{game.title}</h1>
                    <p style={{ color: 'rgba(245,245,245,0.6)', fontSize: '0.85rem', marginTop: '0.5rem' }}>By {game.developer || 'Unknown'}</p>
                </div>
            </div>

            {/* Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Left: Description + Reviews */}
                <div>
                    <div className="panel" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>About</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{game.description}</p>
                        {game.rating && (
                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#f1c40f', fontSize: '1.2rem' }}>{'★'.repeat(Math.floor(game.rating))}</span>
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{game.rating}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>out of 5</span>
                            </div>
                        )}
                    </div>

                    {/* Reviews list */}
                    {reviews.length > 0 && (
                        <div>
                            <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Community Reviews ({reviews.length})</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {reviews.map(r => (
                                    <div key={r._id} className="panel" style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <strong style={{ fontSize: '0.88rem' }}>{r.user?.username || 'User'}</strong>
                                            <span style={{ color: '#f1c40f', fontSize: '0.85rem' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{r.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Sidebar + Review Form */}
                <div>
                    <div className="panel" style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Project Info</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Genre</span>
                                <span>{game.genre}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Developer</span>
                                <span>{game.developer || 'N/A'}</span>
                            </div>
                            {game.user?.username && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Submitted by</span>
                                    <span>{game.user.username}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Added</span>
                                <span>{new Date(game.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {!game.isMock && (
                        <div className="panel">
                            <h4 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>Write a Review</h4>
                            {reviewMsg.text && <div className={`alert alert-${reviewMsg.type}`}>{reviewMsg.text}</div>}
                            <form onSubmit={handleReview}>
                                <div className="form-group">
                                    <label>Rating</label>
                                    <select className="form-control" value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})}>
                                        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n !== 1 ? 's' : ''}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Comment</label>
                                    <textarea className="form-control" rows="3" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} required placeholder="Share your thoughts..." />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Post Review</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
