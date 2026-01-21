import { Play, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  title: string;
  developer: string;
  category: string;
  imageUrl: string;
  plays: string;
}

const GameCard = ({ title, developer, category, imageUrl, plays }: GameCardProps) => {
  return (
    <div className="card-hover group relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-110">
            <Play className="h-7 w-7 fill-current" />
          </button>
        </div>

        {/* Category Badge */}
        <Badge className="absolute right-3 top-3 border-0 bg-accent/90 font-medium text-accent-foreground">
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span>{developer}</span>
          </div>
          <span>{plays} plays</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
