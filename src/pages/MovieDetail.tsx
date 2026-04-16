import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Clock, Globe, Users, ArrowLeft, MessageSquare, Send, Calendar } from "lucide-react";
import { movies } from "@/data/movies";
import { theatres } from "@/data/theatres";
import { showtimes } from "@/data/theatres";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCity } from "@/context/CityContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/* ─── Review helpers ─── */
interface Review {
  id: string;
  userName: string;
  email: string;
  movieId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const REVIEWS_KEY = "cinesphere_reviews";
const BOOKINGS_KEY = "cinesphere_bookings";

const loadReviews = (movieId: string): Review[] => {
  const all: Review[] = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
  return all.filter((r) => r.movieId === movieId);
};

const saveReview = (review: Review) => {
  const all: Review[] = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
  all.push(review);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(all));
};

const hasBookedMovie = (email: string, movieId: string): boolean => {
  const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
  return bookings.some((b: { email: string; movieId: string }) => b.email === email && b.movieId === movieId);
};

const hasReviewedMovie = (email: string, movieId: string): boolean => {
  const all: Review[] = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
  return all.some((r) => r.email === email && r.movieId === movieId);
};

const MovieDetail = () => {
  const { id } = useParams();
  const { selectedCity } = useCity();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const movie = movies.find((m) => m.id === id);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Generate next 7 days
  const upcomingDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Set default date to today
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(upcomingDates[0].toISOString().split("T")[0]);
    }
  }, []);

  useEffect(() => {
    if (id) setReviews(loadReviews(id));
  }, [id]);

  if (!movie) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Movie not found</p>
      </div>
    );
  }

  const cityTheatreIds = theatres.filter((t) => t.city === selectedCity).map((t) => t.id);
  const movieShowtimes = showtimes.filter((s) => s.movieId === movie.id && cityTheatreIds.includes(s.theatreId));

  return (
    <div>
      {/* Banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.bannerUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </section>

      <div className="container mx-auto px-4 -mt-40 relative">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link to="/home"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-8 md:flex-row"
        >
          {/* Poster */}
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="h-80 w-56 shrink-0 rounded-lg object-cover shadow-2xl"
          />

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {movie.genre.map((g) => (
                <Badge key={g} variant="secondary">{g}</Badge>
              ))}
            </div>
            <h1 className="font-display text-4xl font-bold">{movie.title}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {movie.rating > 0 && (
                <span className="flex items-center gap-1 text-primary font-semibold text-base">
                  <Star className="h-5 w-5 fill-primary" /> {movie.rating}/10
                </span>
              )}
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {movie.duration}</span>
              <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> {movie.language}</span>
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed">{movie.synopsis}</p>

            <div className="mt-4">
              <h3 className="flex items-center gap-1 text-sm font-semibold text-muted-foreground mb-1">
                <Users className="h-4 w-4" /> Cast
              </h3>
              <p className="text-sm">{movie.cast.join(", ")}</p>
            </div>
          </div>
        </motion.div>

        {/* Select Date Section */}
        {movie.status === "now-showing" && movieShowtimes.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Select Date
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-8">
              {upcomingDates.map((date) => {
                const dateStr = date.toISOString().split("T")[0];
                const dayName = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
                const dayNum = date.getDate();

                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all text-center",
                      selectedDate === dateStr
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="font-bold text-sm">{dayNum}</div>
                    <div className="text-xs text-muted-foreground">{dayName}</div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Showtimes */}
        {/* ═══════ Reviews Section ═══════ */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" /> Reviews
            {reviews.length > 0 && (
              <span className="text-base font-normal text-muted-foreground">({reviews.length})</span>
            )}
          </h2>

          {/* Review Form */}
          {isAuthenticated && user && id ? (
            !hasBookedMovie(user.email, id) ? (
              <div className="rounded-lg border border-border bg-card p-5 mb-6">
                <p className="text-muted-foreground text-sm">🎟️ You need to book a ticket for this movie before you can write a review.</p>
              </div>
            ) : hasReviewedMovie(user.email, id) ? (
              <div className="rounded-lg border border-border bg-card p-5 mb-6">
                <p className="text-muted-foreground text-sm">✅ You have already reviewed this movie.</p>
              </div>
            ) : (
              <div className="rounded-lg border border-primary/30 bg-card p-5 mb-6">
                <h3 className="font-semibold mb-3">Write a Review</h3>
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground mb-1">Your Rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className="transition-transform hover:scale-110"
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setReviewRating(n)}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            n <= (hoverRating || reviewRating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/40"
                          }`}
                        />
                      </button>
                    ))}
                    {reviewRating > 0 && (
                      <span className="ml-2 text-sm text-primary font-semibold">{reviewRating}/10</span>
                    )}
                  </div>
                </div>
                <textarea
                  className="w-full rounded-md border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  rows={3}
                  maxLength={500}
                  placeholder="Share your experience about this movie..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">{reviewComment.length}/500</span>
                  <Button
                    type="button"
                    size="sm"
                    disabled={reviewRating === 0 || reviewComment.trim().length === 0}
                    onClick={() => {
                      if (!user || !id) return;
                      const newReview: Review = {
                        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
                        userName: user.name,
                        email: user.email,
                        movieId: id,
                        rating: reviewRating,
                        comment: reviewComment.trim(),
                        createdAt: new Date().toISOString(),
                      };
                      saveReview(newReview);
                      setReviews(loadReviews(id));
                      setReviewRating(0);
                      setReviewComment("");
                      toast({ title: "Review submitted!", description: "Thanks for sharing your thoughts." });
                    }}
                  >
                    <Send className="h-4 w-4 mr-1" /> Submit
                  </Button>
                </div>
              </div>
            )
          ) : (
            <div className="rounded-lg border border-border bg-card p-5 mb-6">
              <p className="text-muted-foreground text-sm">
                <Link to="/login" className="text-primary underline">Sign in</Link> to write a review.
              </p>
            </div>
          )}

          {/* Review List */}
          {reviews.length > 0 ? (
            <div className="space-y-4 mb-8">
              {reviews.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
                        {r.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{r.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-primary font-semibold text-sm">
                      <Star className="h-4 w-4 fill-primary" /> {r.rating}/10
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm mb-8">No reviews yet. Be the first to review!</p>
          )}
        </section>

        {movie.status === "now-showing" && movieShowtimes.length > 0 && (
          <section className="mt-12 pb-16">
            <h2 className="font-display text-2xl font-bold mb-6">Available Theatres & Showtimes</h2>
            <div className="space-y-4">
              {movieShowtimes.map((st) => {
                const theatre = theatres.find((t) => t.id === st.theatreId);
                if (!theatre) return null;
                return (
                  <div key={st.theatreId} className="rounded-lg border border-border bg-card p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <Link to={`/theatre/${theatre.id}`} className="font-display font-semibold hover:text-primary transition-colors">
                          {theatre.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{theatre.location}</p>
                        <p className="mt-1 text-xs text-primary font-medium">{theatre.experienceScore}/10 Experience Score</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {st.times.map((time) => (
                          <Button key={time} asChild variant="outline" size="sm">
                            <Link to={`/seat/${movie.id}/${theatre.id}/${encodeURIComponent(time)}?date=${selectedDate}`}>
                              {time}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Standard: ₹{st.price.standard} · Premium: ₹{st.price.premium} · VIP: ₹{st.price.vip}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
