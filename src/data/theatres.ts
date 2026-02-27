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
  city: string;
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
    city: "Trichy",
    description: "The flagship CineMax experience featuring Dolby Atmos sound, laser projection, and luxurious recliner seating across 4 screens.",
    imageUrl: "/maris-screen.jpg",
    galleryImages: [
      "/maris-screen.jpg",
      "/maris-seat.jpg",
      "/maris-outlook.png",
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
    city: "Trichy",
    description: "A modern multiplex with IMAX screens and immersive 4DX experiences. Known for its spectacular lobby and gourmet concessions.",
    imageUrl: "/megastar-screen.jpg",
    galleryImages: [
      "/megastar-screen.jpg",
      "/megastar-seat.jpg",
      "/megastar-outlook.jpg",
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
    location: "8G Williams Rd, Melapudur, Cantonment, Near Central Bus Stand, Trichy, Tamil Nadu",
    city: "Trichy",
    description: "An intimate boutique cinema with just 2 screens, offering a curated selection of films in a luxurious, lounge-style setting with full bar service.",
    imageUrl: "/sm-screen.jpg",
    galleryImages: [
      "/sm-screen.jpg",
      "/sm-seat.jpg",
      "/sm-outlook.jpg",
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
    location: "Salai Road, Near Railway Junction, Trichy, Tamil Nadu",
    city: "Trichy",
    description: "A cutting-edge cinema featuring the latest in LED screen technology and spatial audio. The go-to spot for blockbuster premieres.",
    imageUrl: "/ramba-screen.jpg",
    galleryImages: [
      "/ramba-screen.jpg",
      "/ramba-seat.jpg",
      "/ramba-outlook.jpg",
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
  // --- Thanjavur Theatres ---
  {
    id: "t5",
    name: "Vetri E Square",
    location: "Medical College Road, Thanjavur, Tamil Nadu",
    city: "Thanjavur",
    description: "A premium multiplex offering 4K laser projection and Dolby Atmos sound. The go-to destination for blockbuster premieres in Thanjavur.",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&h=500&fit=crop",
    ],
    screens: 5,
    experienceScore: 9.0,
    screenQuality: 9.2,
    soundQuality: 9.1,
    seatingComfort: 8.7,
    reviews: [
      { id: "r11", author: "TanjoreFilmFan", rating: 9, comment: "Best theatre in Thanjavur! 4K projection is crystal clear and Atmos sound is immersive.", date: "2026-01-22", screenQuality: 10, soundQuality: 9, seatingComfort: 8 },
      { id: "r12", author: "WeekendMovie", rating: 9, comment: "Loved the premium recliner seats. Perfect for a weekend outing with family.", date: "2026-01-18", screenQuality: 9, soundQuality: 9, seatingComfort: 9 },
      { id: "r13", author: "CinemaAddict", rating: 8, comment: "Great ambience and clean facilities. Concessions are a bit pricey though.", date: "2026-01-10", screenQuality: 9, soundQuality: 9, seatingComfort: 8 },
    ],
    seatLayout: { rows: 12, cols: 16, vipRows: 2, premiumRows: 4 },
  },
  {
    id: "t6",
    name: "Shreepathy Cinemas",
    location: "South Main Street, Thanjavur, Tamil Nadu",
    city: "Thanjavur",
    description: "A classic cinema hall with a modern touch, featuring Dolby 7.1 surround sound and comfortable push-back seating. Popular for Tamil releases.",
    imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=500&fit=crop",
    ],
    screens: 3,
    experienceScore: 8.4,
    screenQuality: 8.5,
    soundQuality: 8.6,
    seatingComfort: 8.1,
    reviews: [
      { id: "r14", author: "TamilCinephile", rating: 9, comment: "Always catch Tamil releases here first day. Sound system is top notch!", date: "2026-01-20", screenQuality: 9, soundQuality: 9, seatingComfort: 8 },
      { id: "r15", author: "OldSchoolViewer", rating: 8, comment: "Has that classic cinema charm with modern upgrades. Love it.", date: "2026-01-15", screenQuality: 8, soundQuality: 9, seatingComfort: 8 },
      { id: "r16", author: "FamilyViewer", rating: 8, comment: "Clean, well-maintained, and affordable. Great for family outings.", date: "2026-01-08", screenQuality: 8, soundQuality: 8, seatingComfort: 8 },
    ],
    seatLayout: { rows: 10, cols: 14, vipRows: 2, premiumRows: 3 },
  },
  {
    id: "t7",
    name: "Star Cinemas",
    location: "Gandhiji Road, Thanjavur, Tamil Nadu",
    city: "Thanjavur",
    description: "A mid-range multiplex known for its value pricing and excellent screen quality. Features 4DX experience in select screens.",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&h=500&fit=crop",
    ],
    screens: 4,
    experienceScore: 8.1,
    screenQuality: 8.3,
    soundQuality: 8.0,
    seatingComfort: 8.0,
    reviews: [
      { id: "r17", author: "BudgetWatcher", rating: 8, comment: "Best value for money in Thanjavur. Good screens at affordable prices.", date: "2026-01-19", screenQuality: 8, soundQuality: 8, seatingComfort: 8 },
      { id: "r18", author: "ActionFan", rating: 8, comment: "4DX screen is worth trying! Motion seats add so much to action movies.", date: "2026-01-12", screenQuality: 9, soundQuality: 8, seatingComfort: 7 },
    ],
    seatLayout: { rows: 10, cols: 14, vipRows: 2, premiumRows: 3 },
  },
  {
    id: "t8",
    name: "Frames Cinemas",
    location: "New Bus Stand Road, Thanjavur, Tamil Nadu",
    city: "Thanjavur",
    description: "A modern boutique cinema with intimate screening rooms, premium Dolby sound, and gourmet snack bar. Perfect for an upscale movie experience.",
    imageUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
    ],
    screens: 3,
    experienceScore: 8.8,
    screenQuality: 9.0,
    soundQuality: 8.9,
    seatingComfort: 8.5,
    reviews: [
      { id: "r19", author: "GourmetViewer", rating: 9, comment: "The snack bar alone is worth the visit. Movie experience is equally fantastic.", date: "2026-01-21", screenQuality: 9, soundQuality: 9, seatingComfort: 9 },
      { id: "r20", author: "CoupleFriendly", rating: 9, comment: "Intimate setting, great for date nights. Premium seating is very comfortable.", date: "2026-01-16", screenQuality: 9, soundQuality: 9, seatingComfort: 8 },
      { id: "r21", author: "SoundLover", rating: 8, comment: "Dolby sound is immersive. Slightly small screens but the clarity makes up for it.", date: "2026-01-09", screenQuality: 8, soundQuality: 9, seatingComfort: 8 },
    ],
    seatLayout: { rows: 8, cols: 12, vipRows: 2, premiumRows: 2 },
  },
  {
    id: "t9",
    name: "Vijaya Theatre",
    location: "Hospital Road, Thanjavur, Tamil Nadu",
    city: "Thanjavur",
    description: "A legendary single-screen theatre with a massive 70mm screen. A nostalgic cinema experience with modern sound upgrades.",
    imageUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
    ],
    screens: 1,
    experienceScore: 7.8,
    screenQuality: 8.0,
    soundQuality: 7.8,
    seatingComfort: 7.6,
    reviews: [
      { id: "r22", author: "NostalgiaFan", rating: 9, comment: "The 70mm screen is legendary! Nothing beats watching a mass movie here on opening day.", date: "2026-01-23", screenQuality: 9, soundQuality: 8, seatingComfort: 7 },
      { id: "r23", author: "LocalResident", rating: 7, comment: "Classic theatre with good crowd energy. Sound has been upgraded recently which is a plus.", date: "2026-01-13", screenQuality: 7, soundQuality: 8, seatingComfort: 7 },
      { id: "r24", author: "FirstDayFan", rating: 8, comment: "The atmosphere on first day first show is unmatched. Seating could use more comfort.", date: "2026-01-06", screenQuality: 8, soundQuality: 8, seatingComfort: 7 },
    ],
    seatLayout: { rows: 16, cols: 20, vipRows: 2, premiumRows: 4 },
  },
  {
    id: "t10",
    name: "Ranee Paradise",
    location: "Railway Station Road, Thanjavur, Tamil Nadu",
    city: "Thanjavur",
    description: "A well-known theatre with recently renovated interiors, comfortable seating, and crisp digital projection. Great for family outings.",
    imageUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&h=400&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&h=500&fit=crop",
    ],
    screens: 2,
    experienceScore: 7.5,
    screenQuality: 7.8,
    soundQuality: 7.4,
    seatingComfort: 7.3,
    reviews: [
      { id: "r25", author: "RegularGoer", rating: 8, comment: "Renovation has made a huge difference. Clean and comfortable now.", date: "2026-01-24", screenQuality: 8, soundQuality: 7, seatingComfort: 8 },
      { id: "r26", author: "BudgetFriendly", rating: 7, comment: "Affordable ticket prices for a decent cinema experience. Good for casual viewing.", date: "2026-01-17", screenQuality: 7, soundQuality: 7, seatingComfort: 7 },
      { id: "r27", author: "FamilyFirst", rating: 8, comment: "Nice family-friendly vibe. Kids enjoyed the movie here. Parking is convenient.", date: "2026-01-07", screenQuality: 8, soundQuality: 8, seatingComfort: 7 },
    ],
    seatLayout: { rows: 12, cols: 14, vipRows: 2, premiumRows: 3 },
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
  // Thanjavur theatres
  { theatreId: "t5", movieId: "1", times: ["10:00 AM", "1:15 PM", "4:30 PM", "7:45 PM"], price: { standard: 140, premium: 240, vip: 380 } },
  { theatreId: "t5", movieId: "2", times: ["10:30 AM", "1:45 PM", "5:00 PM", "8:15 PM"], price: { standard: 140, premium: 240, vip: 380 } },
  { theatreId: "t5", movieId: "3", times: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"], price: { standard: 140, premium: 240, vip: 380 } },
  { theatreId: "t5", movieId: "4", times: ["12:00 PM", "3:30 PM", "7:00 PM"], price: { standard: 140, premium: 240, vip: 380 } },
  { theatreId: "t6", movieId: "1", times: ["10:30 AM", "1:30 PM", "5:00 PM", "8:30 PM"], price: { standard: 120, premium: 200, vip: 320 } },
  { theatreId: "t6", movieId: "3", times: ["11:00 AM", "2:15 PM", "5:30 PM", "9:00 PM"], price: { standard: 120, premium: 200, vip: 320 } },
  { theatreId: "t6", movieId: "5", times: ["12:00 PM", "3:30 PM", "6:45 PM"], price: { standard: 120, premium: 200, vip: 320 } },
  { theatreId: "t7", movieId: "2", times: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"], price: { standard: 100, premium: 180, vip: 300 } },
  { theatreId: "t7", movieId: "4", times: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"], price: { standard: 100, premium: 180, vip: 300 } },
  { theatreId: "t7", movieId: "5", times: ["11:00 AM", "2:00 PM", "5:00 PM"], price: { standard: 100, premium: 180, vip: 300 } },
  { theatreId: "t8", movieId: "1", times: ["11:00 AM", "2:30 PM", "6:00 PM", "9:15 PM"], price: { standard: 160, premium: 280, vip: 450 } },
  { theatreId: "t8", movieId: "3", times: ["12:00 PM", "3:30 PM", "7:00 PM"], price: { standard: 160, premium: 280, vip: 450 } },
  { theatreId: "t8", movieId: "5", times: ["1:00 PM", "4:30 PM", "8:00 PM"], price: { standard: 160, premium: 280, vip: 450 } },
  { theatreId: "t9", movieId: "1", times: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"], price: { standard: 80, premium: 150, vip: 250 } },
  { theatreId: "t9", movieId: "2", times: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM", "10:30 PM"], price: { standard: 80, premium: 150, vip: 250 } },
  { theatreId: "t10", movieId: "1", times: ["10:30 AM", "1:45 PM", "5:00 PM", "8:15 PM"], price: { standard: 90, premium: 160, vip: 270 } },
  { theatreId: "t10", movieId: "3", times: ["11:00 AM", "2:30 PM", "6:00 PM", "9:00 PM"], price: { standard: 90, premium: 160, vip: 270 } },
  { theatreId: "t10", movieId: "4", times: ["12:00 PM", "3:30 PM", "7:00 PM"], price: { standard: 90, premium: 160, vip: 270 } },
];
