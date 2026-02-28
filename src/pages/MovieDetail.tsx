import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Globe, Users, ArrowLeft } from "lucide-react";
import { movies } from "@/data/movies";
import { theatres } from "@/data/theatres";
import { showtimes } from "@/data/theatres";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCity } from "@/context/CityContext";

const MovieDetail = () => {
  const { id } = useParams();
  const { selectedCity } = useCity();
  const movie = movies.find((m) => m.id === id);

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

        {/* Showtimes */}
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
                            <Link to={`/book/${movie.id}/${theatre.id}/${encodeURIComponent(time)}`}>
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
