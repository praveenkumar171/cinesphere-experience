import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating = ({ rating, maxRating = 5, size = "md", interactive = false, onChange }: StarRatingProps) => {
  const sizeClass = { sm: "h-3.5 w-3.5", md: "h-5 w-5", lg: "h-6 w-6" }[size];
  const normalizedRating = (rating / 10) * maxRating;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = i < Math.round(normalizedRating);
        return (
          <Star
            key={i}
            className={cn(
              sizeClass,
              interactive && "cursor-pointer transition-colors hover:text-primary",
              filled ? "fill-primary text-primary" : "text-muted-foreground/40"
            )}
            onClick={() => interactive && onChange?.((i + 1) * (10 / maxRating))}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
