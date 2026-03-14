import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MOCK_GAMES } from '../data/mockGames';

const GENRES = ['All', 'Action', 'Adventure', 'RPG', 'Simulation', 'Strategy', 'Sports', 'Puzzle', 'Other'];

const StarRating = ({ rating }) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
        <span className="stars">
            {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
        </span>
    );
};

const GameCard = ({ game }) => (
    <Link to={`/games/${game._id}`} className="game-card">
        <div className="game-card-image">
            <img src={game.imageUrl || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80'} alt={game.title} loading="lazy" />
            <div className="game-card-overlay" />
            <span className="game-card-badge">{game.genre}</span>
        </div>
        <div className="game-card-body">
            <div className="game-card-title">{game.title}</div>
            <div className="game-card-developer">{game.developer || 'Community'}</div>
            {game.rating ? (
                <div className="game-card-rating">
                    <StarRating rating={game.rating} />
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{game.rating}</span>
                </div>
            ) : (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No ratings yet</div>
            )}
        </div>
    </Link>
);

const Games = () => {
    const [apiGames, setApiGames] = useState([]);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/v1/games')
            .then(res => setApiGames(res.data.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const allGames = [...MOCK_GAMES, ...apiGames];
    const filtered = allGames.filter(g => {
        const matchGenre = filter === 'All' || g.genre === filter;
        const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
        return matchGenre && matchSearch;
    });

    return (
        <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <h1 className="page-title">Browse Games</h1>
            <p className="page-sub">Discover community-built games and projects</p>

            {/* Search + Filter Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: '320px' }}
                    placeholder="🔍  Search games..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1 }}>
                    {GENRES.map(g => (
                        <button
                            key={g}
                            onClick={() => setFilter(g)}
                            style={{
                                padding: '0.35rem 0.9rem',
                                borderRadius: '20px',
                                border: '1px solid',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                background: filter === g ? 'var(--accent-blue)' : 'transparent',
                                borderColor: filter === g ? 'var(--accent-blue)' : 'var(--border-color)',
                                color: filter === g ? '#fff' : 'var(--text-secondary)',
                                transition: 'all 0.2s'
                            }}
                        >
                            {g}
                        </button>
                    ))}
                </div>
                <Link to="/profile" className="btn btn-primary" style={{ marginLeft: 'auto' }}>
                    + Publish
                </Link>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    Loading games...
                </div>
            ) : filtered.length === 0 ? (
                <div className="panel" style={{ textAlign: 'center', padding: '4rem' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>No results found</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Try a different genre or search term.</p>
                </div>
            ) : (
                <div className="games-grid">
                    {filtered.map(game => <GameCard key={game._id} game={game} />)}
                </div>
            )}
        </div>
    );
};

export default Games;
