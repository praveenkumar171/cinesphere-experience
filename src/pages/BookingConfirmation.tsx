import { useParams, useSearchParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Film, MapPin, Clock, Armchair, QrCode, ArrowLeft, Download } from "lucide-react";
import { movies } from "@/data/movies";
import { theatres } from "@/data/theatres";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const BookingConfirmation = () => {
  const { movieId, theatreId, time } = useParams();
  const [searchParams] = useSearchParams();
  const [confirmed, setConfirmed] = useState(false);
  const { user } = useAuth();

  const movie = movies.find((m) => m.id === movieId);
  const theatre = theatres.find((t) => t.id === theatreId);
  const decodedTime = time ? decodeURIComponent(time) : "";
  const seats = searchParams.get("seats") || "";
  const total = searchParams.get("total") || "0";

  if (!movie || !theatre) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Invalid booking</p>
      </div>
    );
  }

  const bookingId = `CS-${Date.now().toString(36).toUpperCase()}`;

  if (confirmed) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold">Booking Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Your tickets have been booked successfully</p>

          {/* Mock Ticket */}
          <div className="mt-8 overflow-hidden rounded-xl border border-primary/30 bg-card">
            <div className="bg-primary/10 p-4">
              <p className="font-display text-lg font-bold">{movie.title}</p>
              <p className="text-sm text-muted-foreground">{theatre.name}</p>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>Today</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span>{decodedTime}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Seats</span><span>{seats}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold text-primary">₹{total}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Booking ID</span><span className="font-mono text-xs">{bookingId}</span></div>
            </div>
            <div className="border-t border-dashed border-border p-5 flex flex-col items-center">
              <div className="h-28 w-28 rounded-lg bg-foreground/10 flex items-center justify-center">
                <QrCode className="h-20 w-20 text-foreground/30" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Scan at entrance</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3 justify-center">
            <Button asChild variant="outline"><Link to="/home">Back Home</Link></Button>
            <Button asChild><Link to={`/feedback/${theatre.id}`}>Rate Theatre</Link></Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to={`/book/${movieId}/${theatreId}/${encodeURIComponent(decodedTime)}`}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Change Seats
        </Link>
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg">
        <h1 className="font-display text-2xl font-bold mb-6">Confirm Booking</h1>

        <div className="rounded-lg border border-border bg-card p-5 space-y-4">
          <div className="flex items-center gap-4">
            <img src={movie.posterUrl} alt={movie.title} className="h-24 w-16 rounded object-cover" />
            <div>
              <h2 className="font-display text-lg font-bold">{movie.title}</h2>
              <p className="text-sm text-muted-foreground">{movie.genre.join(", ")} · {movie.duration}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /><span>{theatre.name} — {theatre.location}</span></div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /><span>{decodedTime}</span></div>
            <div className="flex items-center gap-2"><Armchair className="h-4 w-4 text-primary" /><span>Seats: {seats}</span></div>
          </div>

          <div className="border-t border-border pt-4 flex items-center justify-between">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="font-display text-3xl font-bold text-primary">₹{total}</span>
          </div>

          <Button className="w-full" size="lg" onClick={() => {
            // Save booking to localStorage so user can write reviews
            if (user && movieId) {
              const key = "cinesphere_bookings";
              const stored = JSON.parse(localStorage.getItem(key) || "[]");
              stored.push({ email: user.email, movieId, theatreId, time: decodedTime, seats, total, date: new Date().toISOString() });
              localStorage.setItem(key, JSON.stringify(stored));
            }
            setConfirmed(true);
          }}>
            Confirm Booking
          </Button>
          <p className="text-center text-xs text-muted-foreground">This is a simulated booking — no real payment will be made</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmation;
