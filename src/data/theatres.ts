export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  screenQuality: number;
  soundQuality: number;
  seatingComfort: number;
}

export interface Theatre {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  screens: number;
  experienceScore: number;
  screenQuality: number;
  soundQuality: number;
  seatingComfort: number;
  reviews: Review[];
  seatLayout: { rows: number; cols: number; vipRows: number; premiumRows: number };
}

export interface Showtime {
  theatreId: string;
  movieId: string;
  times: string[];
  price: { standard: number; premium: number; vip: number };
}

export const theatres: Theatre[] = [
  {
    id: "t1",
    name: "LA Maris Cinemas",
    location: "DMaris Theater Complex, Teppakulam, Trichy, Tamil Nadu",
    description: "The flagship CineMax experience featuring Dolby Atmos sound, laser projection, and luxurious recliner seating across 4 screens.",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=500&fit=crop",
    ],
    screens: 4,
    experienceScore: 9.2,
    screenQuality: 9.4,
    soundQuality: 9.3,
    seatingComfort: 8.9,
    reviews: [
      { id: "r1", author: "MovieBuff92", rating: 9, comment: "Absolutely stunning picture quality. The Dolby Atmos is a game changer. Best cinema in the city, hands down.", date: "2026-01-20", screenQuality: 10, soundQuality: 9, seatingComfort: 8 },
      { id: "r2", author: "CinemaFan", rating: 9, comment: "Premium experience worth every penny. The recliners are incredibly comfortable.", date: "2026-01-15", screenQuality: 9, soundQuality: 9, seatingComfort: 9 },
      { id: "r3", author: "FilmCritic101", rating: 8, comment: "Great visuals and sound. Seating could be slightly wider but overall excellent.", date: "2026-01-10", screenQuality: 9, soundQuality: 9, seatingComfort: 7 },
    ],
    seatLayout: { rows: 10, cols: 14, vipRows: 2, premiumRows: 3 },
  },
  {
    id: "t2",
    name: "Mega Star Cinemas",
    location: "Thillai Nagar, near Chathram Bus stand, Trichy, Tamil Nadu",
    description: "A modern multiplex with IMAX screens and immersive 4DX experiences. Known for its spectacular lobby and gourmet concessions.",
    imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=500&fit=crop",
    ],
    screens: 6,
    experienceScore: 8.7,
    screenQuality: 9.0,
    soundQuality: 8.5,
    seatingComfort: 8.6,
    reviews: [
      { id: "r4", author: "NightOwl", rating: 9, comment: "IMAX here is unreal. The screen is massive and the sound rattles your bones!", date: "2026-01-18", screenQuality: 10, soundQuality: 9, seatingComfort: 8 },
      { id: "r5", author: "PopcornLover", rating: 8, comment: "Love the food options. Great viewing experience overall.", date: "2026-01-12", screenQuality: 8, soundQuality: 8, seatingComfort: 9 },
    ],
    seatLayout: { rows: 12, cols: 16, vipRows: 2, premiumRows: 4 },
  },
  {
    id: "t3",
    name: "LA SonaMina Cinemas",
    location: "8G Williams Rd, Melapudur,Cantonment,Near Central Bus Stand, Trichy, Tamil Nadu",
    description: "An intimate boutique cinema with just 2 screens, offering a curated selection of films in a luxurious, lounge-style setting with full bar service.",
    imageUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&h=500&fit=crop",
    ],
    screens: 2,
    experienceScore: 9.0,
    screenQuality: 8.8,
    soundQuality: 8.7,
    seatingComfort: 9.5,
    reviews: [
      { id: "r6", author: "LuxCinephile", rating: 10, comment: "The most comfortable cinema seats I've ever experienced. Feels like watching a movie in your living room but 100x better.", date: "2026-01-22", screenQuality: 9, soundQuality: 9, seatingComfort: 10 },
      { id: "r7", author: "DateNight", rating: 9, comment: "Perfect for a special evening. The lounge atmosphere is unmatched.", date: "2026-01-08", screenQuality: 9, soundQuality: 8, seatingComfort: 10 },
      { id: "r8", author: "ArtHouseViewer", rating: 8, comment: "Great curated film selection. Intimate setting. Sound could be slightly better for action movies.", date: "2026-01-05", screenQuality: 8, soundQuality: 8, seatingComfort: 9 },
    ],
    seatLayout: { rows: 8, cols: 10, vipRows: 2, premiumRows: 2 },
  },
  {
    id: "t4",
    name: "Ramba Theatre",
    location: "",
    description: "A cutting-edge cinema featuring the latest in LED screen technology and spatial audio. The go-to spot for blockbuster premieres.",
    imageUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=500&fit=crop",
    ],
    screens: 8,
    experienceScore: 8.3,
    screenQuality: 8.8,
    soundQuality: 8.2,
    seatingComfort: 7.9,
    reviews: [
      { id: "r9", author: "TechGeek", rating: 9, comment: "LED screens are the future. Colors are incredible. Great for sci-fi and action films.", date: "2026-01-25", screenQuality: 10, soundQuality: 8, seatingComfort: 8 },
      { id: "r10", author: "WeekendViewer", rating: 7, comment: "Good screens but seating is average. Gets crowded on weekends.", date: "2026-01-14", screenQuality: 8, soundQuality: 8, seatingComfort: 7 },
    ],
    seatLayout: { rows: 14, cols: 18, vipRows: 3, premiumRows: 4 },
  },
];

export const showtimes: Showtime[] = [
  { theatreId: "t1", movieId: "1", times: ["10:30 AM", "1:45 PM", "5:00 PM", "8:30 PM"], price: { standard: 150, premium: 250, vip: 400 } },
  { theatreId: "t1", movieId: "2", times: ["11:00 AM", "2:15 PM", "6:00 PM", "9:15 PM"], price: { standard: 150, premium: 250, vip: 400 } },
  { theatreId: "t1", movieId: "3", times: ["12:00 PM", "3:30 PM", "7:00 PM"], price: { standard: 150, premium: 250, vip: 400 } },
  { theatreId: "t2", movieId: "1", times: ["10:00 AM", "1:00 PM", "4:30 PM", "8:00 PM", "10:45 PM"], price: { standard: 180, premium: 300, vip: 500 } },
  { theatreId: "t2", movieId: "4", times: ["11:30 AM", "3:00 PM", "6:30 PM", "9:45 PM"], price: { standard: 180, premium: 300, vip: 500 } },
  { theatreId: "t2", movieId: "5", times: ["10:15 AM", "1:30 PM", "5:00 PM"], price: { standard: 180, premium: 300, vip: 500 } },
  { theatreId: "t3", movieId: "3", times: ["2:00 PM", "5:30 PM", "8:45 PM"], price: { standard: 200, premium: 350, vip: 550 } },
  { theatreId: "t3", movieId: "5", times: ["3:00 PM", "6:30 PM", "9:30 PM"], price: { standard: 200, premium: 350, vip: 550 } },
  { theatreId: "t4", movieId: "1", times: ["10:00 AM", "12:45 PM", "3:30 PM", "6:15 PM", "9:00 PM", "11:30 PM"], price: { standard: 120, premium: 200, vip: 350 } },
  { theatreId: "t4", movieId: "2", times: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM", "10:30 PM"], price: { standard: 120, premium: 200, vip: 350 } },
  { theatreId: "t4", movieId: "4", times: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"], price: { standard: 120, premium: 200, vip: 350 } },
];
