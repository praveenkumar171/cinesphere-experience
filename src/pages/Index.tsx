import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, MapPin, ChevronRight, Play } from "lucide-react";
import { movies } from "@/data/movies";
import { theatres, showtimes } from "@/data/theatres";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import { useCity } from "@/context/CityContext";

const Index = () => {
  const [search, setSearch] = useState("");
  const { selectedCity } = useCity();

  // Safety checks: ensure data is arrays
  const safeTheatres = Array.isArray(theatres) ? theatres : [];
  const safeShowtimes = Array.isArray(showtimes) ? showtimes : [];
  const safeMovies = Array.isArray(movies) ? movies : [];

  // Get theatre IDs for the selected city
  const cityTheatreIds = safeTheatres.filter((t) => t.city === selectedCity).map((t) => t.id);
  // Get movie IDs that have showtimes in the selected city's theatres
  const cityMovieIds = new Set(
    safeShowtimes.filter((s) => cityTheatreIds.includes(s.theatreId)).map((s) => s.movieId)
  );

  const nowShowing = safeMovies.filter((m) => m.status === "now-showing" && cityMovieIds.has(m.id));
  const comingSoon = safeMovies.filter((m) => m.status === "coming-soon");
  const featured = nowShowing[0] || safeMovies.find((m) => m.status === "now-showing");

  const filteredMovies = search
    ? safeMovies.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))
    : null;

  // Safety check: if no featured movie, show loading state
  if (!featured) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <p className="text-muted-foreground">Loading movies...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featured.bannerUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="container relative mx-auto flex h-full flex-col justify-end px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">Now Showing</Badge>
            <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
              {featured.title}
            </h1>
            <p className="mt-3 flex items-center gap-3 text-muted-foreground">
              <span className="flex items-center gap-1 text-primary">
                <Star className="h-4 w-4 fill-primary" /> {featured.rating}/10
              </span>
              <span>{featured.genre.join(" · ")}</span>
              <span>{featured.duration}</span>
            </p>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{featured.synopsis}</p>
            <div className="mt-6 flex gap-3">
              <Button asChild size="lg">
                <Link to={`/movie/${featured.id}`}>
                  <Play className="h-4 w-4" /> Book Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={`/movie/${featured.id}`}>Details</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="container mx-auto -mt-6 px-4">
        <div className="glass-card relative mx-auto max-w-xl rounded-xl p-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search movies..."
            className="border-0 bg-transparent pl-10 focus-visible:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {filteredMovies && (
          <div className="mx-auto mt-2 max-w-xl rounded-lg border border-border bg-card p-2">
            {filteredMovies.length === 0 ? (
              <p className="p-3 text-sm text-muted-foreground">No movies found</p>
            ) : (
              filteredMovies.map((m) => (
                <Link
                  key={m.id}
                  to={`/movie/${m.id}`}
                  className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-secondary"
                >
                  <img src={m.posterUrl} alt={m.title} className="h-12 w-8 rounded object-cover" />
                  <div>
                    <p className="text-sm font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.genre.join(", ")}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </section>

      {/* Now Showing */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Now Showing</h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none">
          {nowShowing.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/movie/${movie.id}`} className="group block w-48 shrink-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="sm" className="w-full">Book Now</Button>
                  </div>
                </div>
                <h3 className="mt-2 font-display text-sm font-semibold">{movie.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5 text-primary">
                    <Star className="h-3 w-3 fill-primary" /> {movie.rating}
                  </span>
                  <span>{movie.genre[0]}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="mb-6 font-display text-2xl font-bold">Coming Soon</h2>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none">
          {comingSoon.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/movie/${movie.id}`} className="group block w-48 shrink-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute right-2 top-2 bg-secondary text-foreground">
                    {movie.releaseDate}
                  </Badge>
                </div>
                <h3 className="mt-2 font-display text-sm font-semibold">{movie.title}</h3>
                <p className="text-xs text-muted-foreground">{movie.genre.join(", ")}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
