export interface Movie {
  id: string;
  title: string;
  genre: string[];
  duration: string;
  language: string;
  synopsis: string;
  cast: string[];
  rating: number;
  posterUrl: string;
  bannerUrl: string;
  status: "now-showing" | "coming-soon";
  releaseDate: string;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Echoes of Tomorrow",
    genre: ["Sci-Fi", "Thriller"],
    duration: "2h 28m",
    language: "English",
    synopsis: "In a world where memories can be traded like currency, a detective discovers a conspiracy that threatens to erase the past of millions. Racing against time, she must navigate a labyrinth of stolen memories to uncover the truth.",
    cast: ["Elena Voss", "Marcus Chen", "Aria Blackwood", "James Sterling"],
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=800&fit=crop",
    status: "now-showing",
    releaseDate: "2026-01-15",
  },
  {
    id: "2",
    title: "The Last Frontier",
    genre: ["Action", "Adventure"],
    duration: "2h 15m",
    language: "English",
    synopsis: "A group of explorers embarks on a perilous journey to the edge of an uncharted territory, facing ancient dangers and uncovering secrets that could change humanity forever.",
    cast: ["Ryan Drake", "Sofia Martinez", "Kai Nakamura"],
    rating: 7.9,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=800&fit=crop",
    status: "now-showing",
    releaseDate: "2026-01-22",
  },
  {
    id: "3",
    title: "Midnight Serenade",
    genre: ["Romance", "Drama"],
    duration: "1h 58m",
    language: "English",
    synopsis: "Two musicians from different worlds find their lives intertwined during a single magical night in Paris, where every melody becomes a confession and every silence speaks volumes.",
    cast: ["Isabella Rose", "David Park", "Claire Fontaine"],
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1514533212735-5df27d970db0?w=1920&h=800&fit=crop",
    status: "now-showing",
    releaseDate: "2026-01-29",
  },
  {
    id: "4",
    title: "Shadow Protocol",
    genre: ["Action", "Thriller"],
    duration: "2h 05m",
    language: "English",
    synopsis: "A retired spy is pulled back into action when a ghost from her past resurfaces with a devastating weapon. She must assemble an unlikely team to prevent global catastrophe.",
    cast: ["Natasha Volkov", "Omar Hassan", "Lena Winters"],
    rating: 7.6,
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=800&fit=crop",
    status: "now-showing",
    releaseDate: "2026-02-05",
  },
  {
    id: "5",
    title: "Celestial Gardens",
    genre: ["Fantasy", "Animation"],
    duration: "1h 45m",
    language: "English",
    synopsis: "A young botanist discovers a hidden garden where plants hold the memories of the universe, and must protect it from those who would exploit its power.",
    cast: ["Lily Chen (voice)", "Thomas Gray (voice)", "Maya Patel (voice)"],
    rating: 8.7,
    posterUrl: "https://images.unsplash.com/photo-1518676590747-1e3dcf5a04f6?w=400&h=600&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=800&fit=crop",
    status: "now-showing",
    releaseDate: "2026-02-01",
  },
  {
    id: "6",
    title: "Quantum Break",
    genre: ["Sci-Fi", "Action"],
    duration: "2h 20m",
    language: "English",
    synopsis: "When a quantum experiment goes wrong, a physicist gains the ability to freeze time — but each use fractures reality further, creating parallel versions of herself she must confront.",
    cast: ["Zara Knight", "Leo Fitzgerald", "Dr. Aiko Tanaka"],
    rating: 0,
    posterUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=800&fit=crop",
    status: "coming-soon",
    releaseDate: "2026-03-15",
  },
  {
    id: "7",
    title: "The Cartographer's Dream",
    genre: ["Mystery", "Drama"],
    duration: "2h 10m",
    language: "English",
    synopsis: "An antique map dealer discovers a chart to a place that shouldn't exist, leading her on a journey that blurs the line between cartography and magic.",
    cast: ["Helen Crawford", "Raj Patel", "Finn O'Brien"],
    rating: 0,
    posterUrl: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=600&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=800&fit=crop",
    status: "coming-soon",
    releaseDate: "2026-04-01",
  },
];
