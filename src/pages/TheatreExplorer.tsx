import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Monitor, Star } from "lucide-react";
import { theatres } from "@/data/theatres";
import StarRating from "@/components/StarRating";
import TheatreMap from "@/components/TheatreMap";
import { useCity } from "@/context/CityContext";

const TheatreExplorer = () => {
  const { selectedCity } = useCity();
  const filteredTheatres = theatres.filter((t) => t.city === selectedCity);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold mb-2">Theatre Explorer</h1>
      <p className="text-muted-foreground mb-8">Showing theatres in <span className="text-primary font-semibold">{selectedCity}</span></p>

      <TheatreMap theatres={filteredTheatres} selectedCity={selectedCity} />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCity}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {filteredTheatres.map((theatre, i) => (
            <motion.div
              key={theatre.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/theatre/${theatre.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30 md:flex-row"
              >
                <div className="relative h-48 md:h-auto md:w-64 shrink-0 overflow-hidden">
                  <img
                    src={theatre.imageUrl}
                    alt={theatre.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h2 className="font-display text-xl font-bold">{theatre.name}</h2>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {theatre.location}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{theatre.description}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarRating rating={theatre.experienceScore} size="sm" />
                      <span className="text-sm font-semibold text-primary">{theatre.experienceScore}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Monitor className="h-3.5 w-3.5" /> {theatre.screens} Screens
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TheatreExplorer;
