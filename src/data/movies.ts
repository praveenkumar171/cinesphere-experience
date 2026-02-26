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
    title: "Heyram",
    genre: ["Crime", "Thriller"],
    duration: "3h 30m",
    language: "Tamil, Hindi",
    synopsis: "Saketh Ram's wife is raped and killed during direct action day riots in Calcutta,and he wants to take revenge on the perpetrators. He becomes a vigilante, targeting those responsible for the crime.",
    cast: ["Kamal Haasan", "Shah Rukh Khan", "Rani Mukerji"],
    rating: 7.9,
    posterUrl: "/heyram-poster.jpg",
    bannerUrl: "/heyram-banner.jpg",
    status: "now-showing",
    releaseDate: "2026-01-15",
  },
  {
    id: "1",
    title: "Mankatha",
    genre: ["Action", "Crime"],
    duration: "2h 29m",
    language: "Tamil",
    synopsis: "centering on a high-stakes heist of ₹500 crore in cricket betting money in Mumbai.",
    cast: ["AjithKumar", "Arjun Sarja", "Trisha"],
    rating: 7.7,
    posterUrl: "/mankatha.jpg",
    bannerUrl: "/mankatha.jpg",
    status: "now-showing",
    releaseDate: "2026-01-15",
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
