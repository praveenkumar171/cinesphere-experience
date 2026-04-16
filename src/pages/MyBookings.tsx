import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Ticket, MapPin, Clock, Calendar, Armchair, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { apiUrl } from "@/lib/api";

interface Booking {
  _id: string;
  userId: string;
  userName: string;
  movieId: string;
  movieTitle: string;
  theatreId: string;
  theatreName: string;
  showTime: string;
  seats: string[];
  totalPrice: number;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

const MyBookings = () => {
  const { user, isAuthenticated, accessToken } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        const token = accessToken || localStorage.getItem("cinesphere_access_token");
        
        if (!isAuthenticated) {
          console.warn("User not authenticated - skipping fetch");
          setLoading(false);
          return;
        }

        if (!token) {
          console.error("No authentication token available");
          toast({ description: "Please login to view bookings", variant: "destructive" });
          setLoading(false);
          return;
        }

        console.log("Fetching bookings with token:", token.substring(0, 20) + "...");

        const response = await fetch(apiUrl("/api/bookings/my-bookings"), {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        console.log("Bookings API response:", response.status, response.statusText);

        if (response.ok) {
          const data = await response.json();
          console.log("Bookings data received:", data);
          setBookings(Array.isArray(data.bookings) ? data.bookings : []);
        } else if (response.status === 401) {
          console.error("Unauthorized - token may be invalid");
          toast({ description: "Session expired - please login again", variant: "destructive" });
        } else {
          const error = await response.text();
          console.error("API Error:", response.status, error);
          throw new Error(`HTTP ${response.status}: ${error}`);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        toast({ description: `Failed to load bookings: ${errorMsg}`, variant: "destructive" });
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserBookings();
    }
  }, [isAuthenticated, accessToken, toast]);

  const cancelBooking = async (bookingId: string) => {
    try {
      const token = accessToken || localStorage.getItem("cinesphere_access_token");
      
      if (!token) {
        console.error("No token for cancel request");
        toast({ description: "Authentication required", variant: "destructive" });
        return;
      }

      console.log("Cancelling booking:", bookingId);

      const response = await fetch(apiUrl(`/api/bookings/${bookingId}`), {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      console.log("Cancel response status:", response.status);

      if (response.ok) {
        setBookings(bookings.map(b => 
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        ));
        toast({ description: "Booking cancelled successfully" });
      } else {
        const error = await response.text();
        console.error("Cancel API error:", response.status, error);
        throw new Error(`HTTP ${response.status}: ${error}`);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      toast({ description: `Failed to cancel booking: ${errorMsg}`, variant: "destructive" });
    }
  };

  const downloadReceipt = (booking: Booking) => {
    const receiptContent = `
╔═══════════════════════════════════════════╗
║         CINESPHERE BOOKING RECEIPT        ║
╚═══════════════════════════════════════════╝

MOVIE: ${booking.movieTitle}
THEATRE: ${booking.theatreName}
TIME: ${booking.showTime}
DATE: ${new Date(booking.createdAt).toLocaleDateString()}
SEATS: ${booking.seats.join(", ")}

─────────────────────────────────────────────
TOTAL AMOUNT: ₹${booking.totalPrice}
STATUS: ${booking.status.toUpperCase()}
─────────────────────────────────────────────

Booking Confirmed On: ${new Date(booking.createdAt).toLocaleString()}
User: ${booking.userName}

Thank you for booking with CineSphere!
    `;
    
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(receiptContent));
    element.setAttribute("download", `CineSphere_Receipt_${booking._id}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Please login to view your bookings</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/home">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Link>
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">My Bookings</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage your movie tickets</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No bookings yet</p>
            <p className="text-sm text-muted-foreground mb-4">Start booking your favorite movies!</p>
            <Button asChild>
              <Link to="/home">Browse Movies</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "rounded-lg border bg-card p-5 transition-all",
                  booking.status === "cancelled"
                    ? "border-muted opacity-60"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Movie Title & Genre */}
                    <h3 className="font-display text-lg font-bold mb-3">{booking.movieTitle}</h3>
                    
                    {/* Booking Details */}
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{booking.theatreName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{booking.showTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Armchair className="h-4 w-4 text-primary" />
                        <span>Seats: {booking.seats.join(", ")}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          booking.status === "confirmed"
                            ? "bg-primary/20 text-primary"
                            : "bg-destructive/20 text-destructive"
                        )}
                      >
                        {booking.status === "confirmed" ? "✓ Confirmed" : "✗ Cancelled"}
                      </span>
                      <span className="text-sm font-semibold text-primary">₹{booking.totalPrice}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadReceipt(booking)}
                      disabled={booking.status === "cancelled"}
                      className="whitespace-nowrap"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
                    {booking.status === "confirmed" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => cancelBooking(booking._id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyBookings;
