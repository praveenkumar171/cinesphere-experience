import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { movies } from "@/data/movies";
import { theatres, showtimes } from "@/data/theatres";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ShowtimeSelection = () => {
  const { movieId, theatreId } = useParams();
  const navigate = useNavigate();
  
  const movie = movies.find((m) => m.id === movieId);
  const theatre = theatres.find((t) => t.id === theatreId);
  const showtime = showtimes.find((s) => s.theatreId === theatreId && s.movieId === movieId);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 7 days
  const upcomingDates = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, []);

  if (!movie || !theatre || !showtime) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Invalid selection</p>
      </div>
    );
  }

  const handleProceed = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }
    navigate(`/seat/${movieId}/${theatreId}/${encodeURIComponent(selectedTime)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to={`/movie/${movieId}`}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Link>
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold">{movie.title}</h1>
          <p className="text-sm text-muted-foreground">{theatre.name} · {theatre.location}</p>
        </div>

        {/* Date Selection */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Select Date
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {upcomingDates.map((date, index) => {
              const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD format
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
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Select Time
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {showtime.times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all text-center font-medium",
                    selectedTime === time
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              <Badge variant="secondary" className="mr-2">Standard</Badge> ₹{showtime.price.standard}
              <Badge variant="secondary" className="mx-2">Premium</Badge> ₹{showtime.price.premium}
              <Badge variant="secondary" className="mx-2">VIP</Badge> ₹{showtime.price.vip}
            </p>
          </motion.div>
        )}

        {/* Proceed Button */}
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            disabled={!selectedDate || !selectedTime}
            onClick={handleProceed}
            className="w-full md:w-1/2"
          >
            Select Seats →
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ShowtimeSelection;
