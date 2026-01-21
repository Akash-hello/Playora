import { Search, Upload, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  "All Games",
  "Action",
  "Puzzle",
  "Adventure",
  "Racing",
  "Sports",
  "Strategy",
  "Arcade",
];

const Header = ({ searchQuery, onSearchChange, category, onCategoryChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Gamepad2 className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold tracking-wider">
              <span className="text-gradient">GAME</span>
              <span className="text-foreground">HUB</span>
            </h1>
          </div>

          {/* Search & Category */}
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center lg:max-w-2xl lg:px-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-11 border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              />
            </div>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="h-11 w-full border-border bg-secondary sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="border-border bg-card">
                {categories.map((cat) => (
                  <SelectItem 
                    key={cat} 
                    value={cat.toLowerCase().replace(" ", "-")}
                    className="focus:bg-secondary"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Link to="/submit">
            <Button className="btn-gaming h-11 gap-2 bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
              <Upload className="h-4 w-4" />
              Submit Game
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
