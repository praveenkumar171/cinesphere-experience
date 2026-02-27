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
    id: "2",
    title: "Mankatha",
    genre: ["Action", "Crime"],
    duration: "2h 29m",
    language: "Tamil",
    synopsis: "centering on a high-stakes heist of ₹500 crore in cricket betting money in Mumbai.",
    cast: ["AjithKumar", "Arjun Sarja", "Trisha"],
    rating: 7.7,
    posterUrl: "/mankatha.jpg",
    bannerUrl: "/mankatha-banner.jpg",
    status: "now-showing",
    releaseDate: "2026-01-15",
  },
  {
    id: "3",
    title: "Kaththi",
    genre: ["Action", "Thriller"],
    duration: "2h 46m",
    language: "Tamil",
    synopsis: "Kathiresan, a petty criminal, escapes from a Malaysian prison and arrives in India. He assumes the identity of his lookalike Jeevanandham, a social activist fighting against a powerful corporation that exploits farmers' land and water resources.",
    cast: ["Vijay", "Samantha Ruth Prabhu", "Neil Nitin Mukesh"],
    rating: 8.1,
    posterUrl: "/kaththi-poster.webp",
    bannerUrl: "/kaththi-banner.jpg",
    status: "now-showing",
    releaseDate: "2026-01-29",
  },
  {
    id: "4",
    title: "Aavesham",
    genre: ["Action", "Comedy"],
    duration: "2h 24m",
    language: "Malayalam",
    synopsis: "Three college freshmen in Bangalore seek the help of a local gangster named Ranga to deal with their ragging seniors, but things spiral out of control as Ranga's involvement turns their lives upside down.",
    cast: ["Fahadh Faasil", "Hippogriff", "Sajin Gopu"],
    rating: 7.6,
    posterUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRD8SS_YjDhxSlP6iGJMRcZTsrzxEEMdoEMprhNZXmWTq42fizd",
    bannerUrl: "/aavesham-banner.jpg",
    status: "now-showing",
    releaseDate: "2026-02-05",
  },
  {
    id: "5",
    title: "Inception",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: "2h 28m",
    language: "English",
    synopsis: "A skilled thief who steals secrets from deep within the subconscious during the dream state is given a chance to have his criminal record erased if he can successfully perform inception — planting an idea into a target's mind.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    rating: 8.8,
    posterUrl: "/inception-poster.jpg",
    bannerUrl: "/inception-banner.jpg",
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
