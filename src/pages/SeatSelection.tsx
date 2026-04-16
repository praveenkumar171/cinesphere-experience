import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Monitor } from "lucide-react";
import { movies } from "@/data/movies";
import { theatres, showtimes } from "@/data/theatres";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { apiUrl } from "@/lib/api";

type SeatStatus = "available" | "occupied" | "selected";
type SeatTier = "standard" | "premium" | "vip";

interface Seat {
  row: number;
  col: number;
  status: SeatStatus;
  tier: SeatTier;
}

const SeatSelection = () => {
  const { movieId, theatreId, time } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === movieId);
  const theatre = theatres.find((t) => t.id === theatreId);
  const showtime = showtimes.find((s) => s.theatreId === theatreId && s.movieId === movieId);
  const decodedTime = time ? decodeURIComponent(time) : "";
  const bookingDate = searchParams.get("date") || "";

  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch booked seats from backend
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await fetch(
          apiUrl(
            `/api/bookings/seats/booked?movieId=${movieId}&theatreId=${theatreId}&showTime=${encodeURIComponent(decodedTime)}`
          )
        );
        if (response.ok) {
          const data = await response.json();
          setBookedSeats(data.bookedSeats || []);
        }
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId && theatreId && decodedTime) {
      fetchBookedSeats();
    }
  }, [movieId, theatreId, decodedTime]);

  const seatMap = useMemo(() => {
    if (!theatre) return [];
    const { rows, cols, vipRows, premiumRows } = theatre.seatLayout;
    const seats: Seat[][] = [];

    for (let r = 0; r < rows; r++) {
      const row: Seat[] = [];
      let tier: SeatTier = "standard";
      if (r < vipRows) tier = "vip";
      else if (r < vipRows + premiumRows) tier = "premium";

      for (let c = 0; c < cols; c++) {
        const seatLabel = `${String.fromCharCode(65 + r)}${c + 1}`;
        // Check if this seat is in the booked seats list
        const isBooked = bookedSeats.includes(seatLabel);
        
        row.push({
          row: r,
          col: c,
          status: isBooked ? "occupied" : "available",
          tier,
        });
      }
      seats.push(row);
    }
    return seats;
  }, [theatre, bookedSeats]);

  const [seats, setSeats] = useState<Seat[][]>(seatMap);

  useEffect(() => {
    setSeats(seatMap);
  }, [seatMap]);

  if (!movie || !theatre || !showtime) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Invalid booking selection</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Loading available seats...</p>
      </div>
    );
  }

  const selectedSeats = seats.flat().filter((s) => s.status === "selected");
  const totalPrice = selectedSeats.reduce((sum, s) => sum + showtime.price[s.tier], 0);

  const toggleSeat = (row: number, col: number) => {
    setSeats((prev) =>
      prev.map((r, ri) =>
        r.map((s, ci) => {
          if (ri === row && ci === col && s.status !== "occupied") {
            return { ...s, status: s.status === "selected" ? "available" : "selected" };
          }
          return s;
        })
      )
    );
  };

  const rowLabel = (i: number) => String.fromCharCode(65 + i);

  const handleProceed = () => {
    const seatLabels = selectedSeats.map((s) => `${rowLabel(s.row)}${s.col + 1}`);
    navigate(`/confirm/${movieId}/${theatreId}/${encodeURIComponent(decodedTime)}?seats=${seatLabels.join(",")}&total=${totalPrice}&date=${bookingDate}`);
  };

  const tierColors: Record<SeatTier, string> = {
    standard: "bg-secondary hover:bg-secondary/80 border-border",
    premium: "bg-blue-900/40 hover:bg-blue-900/60 border-blue-800/50",
    vip: "bg-primary/20 hover:bg-primary/30 border-primary/40",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to={`/movie/${movieId}`}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold">{movie.title}</h1>
          <p className="text-sm text-muted-foreground">{theatre.name} · {decodedTime}</p>
        </div>

        {/* Seat Map */}
        <div className="mx-auto max-w-2xl overflow-x-auto">
          <div className="flex flex-col items-center gap-1.5 min-w-fit pb-4">
            {seats.map((row, ri) => (
              <div key={ri} className="flex items-center gap-1.5">
                <span className="w-5 text-center text-xs text-muted-foreground">{rowLabel(ri)}</span>
                {row.map((seat, ci) => (
                  <button
                    key={ci}
                    disabled={seat.status === "occupied"}
                    onClick={() => toggleSeat(ri, ci)}
                    className={cn(
                      "h-6 w-6 rounded-t-md border text-[9px] font-medium transition-all md:h-7 md:w-7",
                      seat.status === "occupied" && "cursor-not-allowed bg-muted/30 border-transparent opacity-30",
                      seat.status === "selected" && "bg-primary border-primary text-primary-foreground scale-110",
                      seat.status === "available" && tierColors[seat.tier]
                    )}
                  >
                    {seat.status !== "occupied" && (ci + 1)}
                  </button>
                ))}
                <span className="w-5 text-center text-xs text-muted-foreground">{rowLabel(ri)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Screen placed near last row (bottom) */}
        <div className="mx-auto mt-6 max-w-2xl">
          <div className="mx-8 h-2 rounded-b-full bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20" />
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Monitor className="h-4 w-4" /> SCREEN
          </div>
        </div>

        {/* Legend */}
        <div className="mx-auto mt-4 flex max-w-md flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5"><div className="h-4 w-4 rounded-t-md bg-secondary border border-border" /> Standard (₹{showtime.price.standard})</div>
          <div className="flex items-center gap-1.5"><div className="h-4 w-4 rounded-t-md bg-blue-900/40 border border-blue-800/50" /> Premium (₹{showtime.price.premium})</div>
          <div className="flex items-center gap-1.5"><div className="h-4 w-4 rounded-t-md bg-primary/20 border border-primary/40" /> VIP (₹{showtime.price.vip})</div>
          <div className="flex items-center gap-1.5"><div className="h-4 w-4 rounded-t-md bg-muted/30 opacity-30" /> Occupied</div>
          <div className="flex items-center gap-1.5"><div className="h-4 w-4 rounded-t-md bg-primary" /> Selected</div>
        </div>

        {/* Summary */}
        <div className="mx-auto mt-8 max-w-md rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Selected Seats</span>
            <span className="text-sm font-semibold">
              {selectedSeats.length > 0 ? selectedSeats.map((s) => `${rowLabel(s.row)}${s.col + 1}`).join(", ") : "None"}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Price</span>
            <span className="font-display text-2xl font-bold text-primary">₹{totalPrice}</span>
          </div>
          <Button className="w-full" size="lg" disabled={selectedSeats.length === 0} onClick={handleProceed}>
            Proceed to Booking
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SeatSelection;
