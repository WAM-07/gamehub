import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_GAMES, FEATURED_GAME } from '../data/mockGames';

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
    <Link to={/games/} className="game-card">
        <div className="game-card-image">
            <img src={game.imageUrl} alt={game.title} loading="lazy" />
            <div className="game-card-overlay" />
            <span className="game-card-badge">{game.genre}</span>
        </div>
        <div className="game-card-body">
            <div className="game-card-title">{game.title}</div>
            <div className="game-card-developer">{game.developer}</div>
            <div className="game-card-rating">
                <StarRating rating={game.rating} />
                <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{game.rating}</span>
            </div>
        </div>
    </Link>
);

const Home = () => {
    const [heroLoaded, setHeroLoaded] = useState(false);
    useEffect(() => {
        const img = new Image();
        img.onload = () => setHeroLoaded(true);
        img.src = FEATURED_GAME.imageUrl;
    }, []);

    const featured = MOCK_GAMES.slice(1, 3);
    const topPicks = MOCK_GAMES.slice(3);

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <div className="hero" style={{ opacity: heroLoaded ? 1 : 0.5, transition: 'opacity 0.5s' }}>
                <div className="hero-bg"><img src={FEATURED_GAME.imageUrl} alt={FEATURED_GAME.title} /></div>
                <div className="hero-overlay" />
                <div className="hero-content">
                    <span className="hero-badge">🔥 Featured</span>
                    <h1 className="hero-title">{FEATURED_GAME.title}</h1>
                    <p className="hero-desc">{FEATURED_GAME.description}</p>
                    <div className="hero-actions">
                        <Link to={/games/} className="btn btn-white">▶&nbsp;View Game</Link>
                        <Link to="/games" className="btn btn-ghost">Browse All</Link>
                    </div>
                </div>
            </div>

            <div className="section-header" style={{ marginTop: '2rem' }}>
                <span className="section-title">Trending Now</span>
                <Link to="/games" className="section-link">See all →</Link>
            </div>

            <div className="featured-row">
                {featured.map(game => (
                    <Link to={/games/} key={game._id} className="wide-card">
                        <img src={game.imageUrl} alt={game.title} loading="lazy" />
                        <div className="wide-card-overlay" />
                        <div className="wide-card-content">
                            <div className="wide-card-genre">{game.genre}</div>
                            <div className="wide-card-title">{game.title}</div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="section-header">
                <span className="section-title">Top Picks</span>
                <Link to="/games" className="section-link">See all →</Link>
            </div>

            <div className="games-grid">
                {topPicks.map(game => <GameCard key={game._id} game={game} />)}
            </div>

            <div className="panel" style={{ background: 'linear-gradient(135deg,rgba(0,116,228,.15),rgba(137,87,229,.15))', border: '1px solid rgba(0,116,228,.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '.4rem' }}>Share your own project</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '.875rem' }}>Create an account to publish your game or web app and get feedback from the community.</p>
                </div>
                <Link to="/register" className="btn btn-primary" style={{ padding: '.75rem 1.8rem' }}>Get Started</Link>
            </div>
        </div>
    );
};

export default Home;
