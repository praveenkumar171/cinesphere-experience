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
    posterUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349133/cinesphere/movies/heyram-poster.jpg",
    bannerUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349134/cinesphere/movies/heyram-banner.jpg",
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
    posterUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349136/cinesphere/movies/mankatha-poster.jpg",
    bannerUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349137/cinesphere/movies/mankatha-banner.jpg",
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
    posterUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349139/cinesphere/movies/kaththi-poster.webp",
    bannerUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349140/cinesphere/movies/kaththi-banner.jpg",
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
    posterUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349141/cinesphere/movies/aavesham-poster.jpg",
    bannerUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349142/cinesphere/movies/aavesham-banner.jpg",
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
    posterUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349144/cinesphere/movies/inception-poster.jpg",
    bannerUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349146/cinesphere/movies/inception-banner.jpg",
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
    posterUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349147/cinesphere/movies/quantum-break-poster.jpg",
    bannerUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349148/cinesphere/movies/quantum-break-banner.jpg",
    status: "coming-soon",
    releaseDate: "2026-06-16",
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
    posterUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349149/cinesphere/movies/the-cartographer-s-dream-poster.jpg",
    bannerUrl: "https://res.cloudinary.com/dxig2wfai/image/upload/v1774349150/cinesphere/movies/the-cartographer-s-dream-banner.jpg",
    status: "coming-soon",
    releaseDate: "2026-07-02",
  },
];
