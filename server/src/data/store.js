/**
 * In-memory data store — replaces DB until MongoDB is wired.
 * All mutations happen on these arrays; data resets on server restart.
 */
const { v4: uuidv4 } = require("uuid");

/* ═══════════════════  USERS  ═══════════════════ */
const users = [];

/* ═══════════════════  MOVIES  ═══════════════════ */
const movies = [
  {
    id: "1",
    title: "Heyram",
    genre: ["Crime", "Thriller"],
    duration: "3h 30m",
    language: "Tamil, Hindi",
    synopsis: "Saketh Ram's wife is raped and killed during direct action day riots in Calcutta, and he wants to take revenge on the perpetrators.",
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
    synopsis: "Centering on a high-stakes heist of ₹500 crore in cricket betting money in Mumbai.",
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
    synopsis: "Kathiresan, a petty criminal, escapes from a Malaysian prison and arrives in India. He assumes the identity of his lookalike Jeevanandham.",
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
    synopsis: "Three college freshmen in Bangalore seek the help of a local gangster named Ranga to deal with their ragging seniors.",
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
    synopsis: "A skilled thief who steals secrets from deep within the subconscious during the dream state is given a chance to have his criminal record erased.",
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
    synopsis: "When a quantum experiment goes wrong, a physicist gains the ability to freeze time.",
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
    synopsis: "An antique map dealer discovers a chart to a place that shouldn't exist.",
    cast: ["Helen Crawford", "Raj Patel", "Finn O'Brien"],
    rating: 0,
    posterUrl: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=600&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=800&fit=crop",
    status: "coming-soon",
    releaseDate: "2026-04-01",
  },
];

/* ═══════════════════  THEATRES  ═══════════════════ */
const theatres = [
  { id: "t1", name: "LA Maris Cinemas", location: "DMaris Theater Complex, Teppakulam, Trichy, Tamil Nadu", city: "Trichy", screens: 4, experienceScore: 9.2, screenQuality: 9.4, soundQuality: 9.3, seatingComfort: 8.9, seatLayout: { rows: 10, cols: 14, vipRows: 2, premiumRows: 3 } },
  { id: "t2", name: "Mega Star Cinemas", location: "Thillai Nagar, near Chathram Bus stand, Trichy, Tamil Nadu", city: "Trichy", screens: 6, experienceScore: 8.7, screenQuality: 9.0, soundQuality: 8.5, seatingComfort: 8.6, seatLayout: { rows: 12, cols: 16, vipRows: 2, premiumRows: 4 } },
  { id: "t3", name: "LA SonaMina Cinemas", location: "8G Williams Rd, Melapudur, Cantonment, Trichy, Tamil Nadu", city: "Trichy", screens: 2, experienceScore: 9.0, screenQuality: 8.8, soundQuality: 8.7, seatingComfort: 9.5, seatLayout: { rows: 8, cols: 10, vipRows: 2, premiumRows: 2 } },
  { id: "t4", name: "Ramba Theatre", location: "Salai Road, Near Railway Junction, Trichy, Tamil Nadu", city: "Trichy", screens: 8, experienceScore: 8.3, screenQuality: 8.8, soundQuality: 8.2, seatingComfort: 7.9, seatLayout: { rows: 14, cols: 18, vipRows: 3, premiumRows: 4 } },
  { id: "t5", name: "Vetri E Square", location: "Medical College Road, Thanjavur, Tamil Nadu", city: "Thanjavur", screens: 5, experienceScore: 9.0, screenQuality: 9.2, soundQuality: 9.1, seatingComfort: 8.7, seatLayout: { rows: 12, cols: 16, vipRows: 2, premiumRows: 4 } },
  { id: "t6", name: "Shreepathy Cinemas", location: "South Main Street, Thanjavur, Tamil Nadu", city: "Thanjavur", screens: 3, experienceScore: 8.4, screenQuality: 8.5, soundQuality: 8.6, seatingComfort: 8.1, seatLayout: { rows: 10, cols: 14, vipRows: 2, premiumRows: 3 } },
  { id: "t7", name: "Star Cinemas", location: "Gandhiji Road, Thanjavur, Tamil Nadu", city: "Thanjavur", screens: 4, experienceScore: 8.1, screenQuality: 8.3, soundQuality: 8.0, seatingComfort: 8.0, seatLayout: { rows: 10, cols: 14, vipRows: 2, premiumRows: 3 } },
  { id: "t8", name: "Frames Cinemas", location: "New Bus Stand Road, Thanjavur, Tamil Nadu", city: "Thanjavur", screens: 3, experienceScore: 8.8, screenQuality: 9.0, soundQuality: 8.9, seatingComfort: 8.5, seatLayout: { rows: 8, cols: 12, vipRows: 2, premiumRows: 2 } },
  { id: "t9", name: "Vijaya Theatre", location: "Hospital Road, Thanjavur, Tamil Nadu", city: "Thanjavur", screens: 1, experienceScore: 7.8, screenQuality: 8.0, soundQuality: 7.8, seatingComfort: 7.6, seatLayout: { rows: 16, cols: 20, vipRows: 2, premiumRows: 4 } },
  { id: "t10", name: "Ranee Paradise", location: "Railway Station Road, Thanjavur, Tamil Nadu", city: "Thanjavur", screens: 2, experienceScore: 7.5, screenQuality: 7.8, soundQuality: 7.4, seatingComfort: 7.3, seatLayout: { rows: 12, cols: 14, vipRows: 2, premiumRows: 3 } },
];

/* ═══════════════════  SHOWTIMES  ═══════════════════ */
const showtimes = [
  { id: "s1", theatreId: "t1", movieId: "1", times: ["10:30 AM","1:45 PM","5:00 PM","8:30 PM"], price: { standard: 150, premium: 250, vip: 400 } },
  { id: "s2", theatreId: "t1", movieId: "2", times: ["11:00 AM","2:15 PM","6:00 PM","9:15 PM"], price: { standard: 150, premium: 250, vip: 400 } },
  { id: "s3", theatreId: "t1", movieId: "3", times: ["12:00 PM","3:30 PM","7:00 PM"], price: { standard: 150, premium: 250, vip: 400 } },
  { id: "s4", theatreId: "t2", movieId: "1", times: ["10:00 AM","1:00 PM","4:30 PM","8:00 PM","10:45 PM"], price: { standard: 180, premium: 300, vip: 500 } },
  { id: "s5", theatreId: "t2", movieId: "4", times: ["11:30 AM","3:00 PM","6:30 PM","9:45 PM"], price: { standard: 180, premium: 300, vip: 500 } },
  { id: "s6", theatreId: "t2", movieId: "5", times: ["10:15 AM","1:30 PM","5:00 PM"], price: { standard: 180, premium: 300, vip: 500 } },
  { id: "s7", theatreId: "t3", movieId: "3", times: ["2:00 PM","5:30 PM","8:45 PM"], price: { standard: 200, premium: 350, vip: 550 } },
  { id: "s8", theatreId: "t3", movieId: "5", times: ["3:00 PM","6:30 PM","9:30 PM"], price: { standard: 200, premium: 350, vip: 550 } },
  { id: "s9", theatreId: "t4", movieId: "1", times: ["10:00 AM","12:45 PM","3:30 PM","6:15 PM","9:00 PM","11:30 PM"], price: { standard: 120, premium: 200, vip: 350 } },
  { id: "s10", theatreId: "t4", movieId: "2", times: ["11:00 AM","2:00 PM","5:00 PM","8:00 PM","10:30 PM"], price: { standard: 120, premium: 200, vip: 350 } },
  { id: "s11", theatreId: "t4", movieId: "4", times: ["10:30 AM","1:30 PM","4:30 PM","7:30 PM"], price: { standard: 120, premium: 200, vip: 350 } },
  { id: "s12", theatreId: "t5", movieId: "1", times: ["10:00 AM","1:15 PM","4:30 PM","7:45 PM"], price: { standard: 140, premium: 240, vip: 380 } },
  { id: "s13", theatreId: "t5", movieId: "2", times: ["10:30 AM","1:45 PM","5:00 PM","8:15 PM"], price: { standard: 140, premium: 240, vip: 380 } },
  { id: "s14", theatreId: "t5", movieId: "3", times: ["11:00 AM","2:30 PM","6:00 PM","9:30 PM"], price: { standard: 140, premium: 240, vip: 380 } },
  { id: "s15", theatreId: "t5", movieId: "4", times: ["12:00 PM","3:30 PM","7:00 PM"], price: { standard: 140, premium: 240, vip: 380 } },
  { id: "s16", theatreId: "t6", movieId: "1", times: ["10:30 AM","1:30 PM","5:00 PM","8:30 PM"], price: { standard: 120, premium: 200, vip: 320 } },
  { id: "s17", theatreId: "t6", movieId: "3", times: ["11:00 AM","2:15 PM","5:30 PM","9:00 PM"], price: { standard: 120, premium: 200, vip: 320 } },
  { id: "s18", theatreId: "t6", movieId: "5", times: ["12:00 PM","3:30 PM","6:45 PM"], price: { standard: 120, premium: 200, vip: 320 } },
  { id: "s19", theatreId: "t7", movieId: "2", times: ["10:00 AM","1:00 PM","4:00 PM","7:00 PM","10:00 PM"], price: { standard: 100, premium: 180, vip: 300 } },
  { id: "s20", theatreId: "t7", movieId: "4", times: ["10:30 AM","1:30 PM","4:30 PM","7:30 PM"], price: { standard: 100, premium: 180, vip: 300 } },
  { id: "s21", theatreId: "t7", movieId: "5", times: ["11:00 AM","2:00 PM","5:00 PM"], price: { standard: 100, premium: 180, vip: 300 } },
  { id: "s22", theatreId: "t8", movieId: "1", times: ["11:00 AM","2:30 PM","6:00 PM","9:15 PM"], price: { standard: 160, premium: 280, vip: 450 } },
  { id: "s23", theatreId: "t8", movieId: "3", times: ["12:00 PM","3:30 PM","7:00 PM"], price: { standard: 160, premium: 280, vip: 450 } },
  { id: "s24", theatreId: "t8", movieId: "5", times: ["1:00 PM","4:30 PM","8:00 PM"], price: { standard: 160, premium: 280, vip: 450 } },
  { id: "s25", theatreId: "t9", movieId: "1", times: ["10:00 AM","1:00 PM","4:00 PM","7:00 PM","10:00 PM"], price: { standard: 80, premium: 150, vip: 250 } },
  { id: "s26", theatreId: "t9", movieId: "2", times: ["10:30 AM","1:30 PM","4:30 PM","7:30 PM","10:30 PM"], price: { standard: 80, premium: 150, vip: 250 } },
  { id: "s27", theatreId: "t10", movieId: "1", times: ["10:30 AM","1:45 PM","5:00 PM","8:15 PM"], price: { standard: 90, premium: 160, vip: 270 } },
  { id: "s28", theatreId: "t10", movieId: "3", times: ["11:00 AM","2:30 PM","6:00 PM","9:00 PM"], price: { standard: 90, premium: 160, vip: 270 } },
  { id: "s29", theatreId: "t10", movieId: "4", times: ["12:00 PM","3:30 PM","7:00 PM"], price: { standard: 90, premium: 160, vip: 270 } },
];

/* ═══════════════════  BOOKINGS  ═══════════════════ */
const bookings = [];

/* ═══════════════════  REVIEWS  ═══════════════════ */
const reviews = [];

/* ═══════════════════  BOOKED-SEATS MAP  ═══════════════════ */
// key: `${theatreId}-${movieId}-${time}` → Set<"A1","B3",...>
const bookedSeatsMap = {};

/* ═══════════════════  REFRESH TOKENS (in-memory blacklist)  ═══════════════════ */
const refreshTokens = new Set();

module.exports = {
  users,
  movies,
  theatres,
  showtimes,
  bookings,
  reviews,
  bookedSeatsMap,
  refreshTokens,
};
