import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Check } from "lucide-react";
import { theatres } from "@/data/theatres";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/StarRating";

const Feedback = () => {
  const { theatreId } = useParams();
  const theatre = theatres.find((t) => t.id === theatreId);
  const [screenRating, setScreenRating] = useState(0);
  const [soundRating, setSoundRating] = useState(0);
  const [seatingRating, setSeatingRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!theatre) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Theatre not found</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (screenRating && soundRating && seatingRating) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold">Thank You!</h1>
          <p className="mt-2 text-muted-foreground">Your feedback helps other movie-goers choose better.</p>
          <Button asChild className="mt-6"><Link to={`/theatre/${theatreId}`}>Back to Theatre</Link></Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to={`/theatre/${theatreId}`}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg">
        <h1 className="font-display text-2xl font-bold mb-2">Rate Your Experience</h1>
        <p className="text-muted-foreground mb-6">How was your visit to <span className="text-foreground font-medium">{theatre.name}</span>?</p>

        <div className="space-y-6 rounded-lg border border-border bg-card p-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Screen Quality</label>
            <StarRating rating={screenRating} size="lg" interactive onChange={setScreenRating} />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Sound Performance</label>
            <StarRating rating={soundRating} size="lg" interactive onChange={setSoundRating} />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Seating Comfort</label>
            <StarRating rating={seatingRating} size="lg" interactive onChange={setSeatingRating} />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Your Review</label>
            <Textarea
              placeholder="Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={!screenRating || !soundRating || !seatingRating}
          >
            <Send className="h-4 w-4 mr-1" /> Submit Review
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Feedback;
