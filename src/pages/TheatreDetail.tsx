import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Monitor, Star, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { theatres, showtimes } from "@/data/theatres";
import { movies } from "@/data/movies";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import TheatreDirectionsMap from "@/components/TheatreDirectionsMap";

const TheatreDetail = () => {
  const { id } = useParams();
  const theatre = theatres.find((t) => t.id === id);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!theatre) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Theatre not found</p>
      </div>
    );
  }

  const theatreShowtimes = showtimes.filter((s) => s.theatreId === theatre.id);

  const prevImage = () => setGalleryIndex((i) => (i === 0 ? theatre.galleryImages.length - 1 : i - 1));
  const nextImage = () => setGalleryIndex((i) => (i === theatre.galleryImages.length - 1 ? 0 : i + 1));

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/theatres"><ArrowLeft className="h-4 w-4 mr-1" /> All Theatres</Link>
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Gallery */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={theatre.galleryImages[galleryIndex]}
            alt={`${theatre.name} view ${galleryIndex + 1}`}
            className="h-72 w-full object-cover md:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 backdrop-blur hover:bg-background/80 transition">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 backdrop-blur hover:bg-background/80 transition">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {theatre.galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === galleryIndex ? "w-6 bg-primary" : "w-1.5 bg-foreground/40"}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">{theatre.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {theatre.location}
            </p>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <Monitor className="h-4 w-4" /> {theatre.screens} Screens
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{theatre.description}</p>
          </div>

          {/* Experience Score */}
          <div className="shrink-0 rounded-lg border border-border bg-card p-5 md:w-64">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Experience Score</h3>
            <div className="text-center mb-4">
              <span className="font-display text-4xl font-bold text-primary">{theatre.experienceScore}</span>
              <span className="text-lg text-muted-foreground">/10</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Screen Quality</span><span className="font-medium">{theatre.screenQuality}/10</span></div>
              <div className="h-1.5 rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${theatre.screenQuality * 10}%` }} />
              </div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sound Quality</span><span className="font-medium">{theatre.soundQuality}/10</span></div>
              <div className="h-1.5 rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${theatre.soundQuality * 10}%` }} />
              </div>
              <div className="flex justify-between"><span className="text-muted-foreground">Seating Comfort</span><span className="font-medium">{theatre.seatingComfort}/10</span></div>
              <div className="h-1.5 rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${theatre.seatingComfort * 10}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Now Showing */}
        <TheatreDirectionsMap theatre={theatre} />

        {theatreShowtimes.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold mb-4">Now Showing Here</h2>
            <div className="space-y-3">
              {theatreShowtimes.map((st) => {
                const movie = movies.find((m) => m.id === st.movieId);
                if (!movie) return null;
                return (
                  <div key={st.movieId} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <img src={movie.posterUrl} alt={movie.title} className="h-16 w-11 rounded object-cover" />
                      <div>
                        <Link to={`/movie/${movie.id}`} className="font-display font-semibold hover:text-primary transition-colors">{movie.title}</Link>
                        <p className="text-xs text-muted-foreground">{movie.genre.join(", ")} · {movie.duration}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {st.times.map((time) => (
                        <Button key={time} asChild variant="outline" size="sm">
                          <Link to={`/book/${movie.id}/${theatre.id}/${encodeURIComponent(time)}`}>{time}</Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="mt-10 pb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold">Reviews</h2>
            <Button asChild variant="outline" size="sm">
              <Link to={`/feedback/${theatre.id}`}>Write a Review</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {theatre.reviews.map((review) => (
              <div key={review.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-semibold">
                    <Star className="h-4 w-4 fill-primary" /> {review.rating}/10
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default TheatreDetail;
