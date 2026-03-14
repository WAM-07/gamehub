// Mock game data seeded into the app for a rich UI experience
// Used in Games.jsx and Home.jsx for demo purposes

export const MOCK_GAMES = [
  {
    _id: 'mock-1',
    title: 'Stellar Odyssey',
    description: 'An epic open-world space RPG where you explore thousands of star systems, forge alliances, and build your galactic empire from the ground up.',
    genre: 'RPG',
    developer: 'NovaStar Studios',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    rating: 4.8,
    isMock: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-2',
    title: 'Iron Fortress',
    description: 'A tactical real-time strategy game set in a dystopian future. Build your base, train your army, and crush enemy factions across 50 campaign missions.',
    genre: 'Strategy',
    developer: 'Hardline Games',
    imageUrl: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80',
    rating: 4.5,
    isMock: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-3',
    title: 'Neon Drift',
    description: 'Burn rubber in hyper-stylized neon cities. Race against AI rivals, customize your car with hundreds of parts, and dominate the underground street racing league.',
    genre: 'Action',
    developer: 'Velocity Interactive',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    rating: 4.3,
    isMock: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-4',
    title: 'The Last Frontier',
    description: 'Survive, explore, and thrive in a vast apocalyptic wilderness. Craft tools, build shelters, and unravel the mystery of the collapse.',
    genre: 'Adventure',
    developer: 'WildEdge Dev',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    rating: 4.6,
    isMock: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-5',
    title: 'CyberArena',
    description: 'A fast-paced multiplayer battle royale in a cyber-punk city. Use hacking abilities, drone strikes, and energy shields in 5-minute intense matches.',
    genre: 'Action',
    developer: 'ByteForge Labs',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    rating: 4.2,
    isMock: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-6',
    title: 'Puzzle Realm',
    description: 'Immerse yourself in intricate puzzles across 100 hand-crafted levels. A soothing yet deeply challenging experience for puzzle enthusiasts.',
    genre: 'Puzzle',
    developer: 'MindMazes',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    rating: 4.7,
    isMock: true,
    createdAt: new Date().toISOString()
  }
];

export const FEATURED_GAME = MOCK_GAMES[0];
