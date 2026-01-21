import { useState } from "react";
import { Upload, Gamepad2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Action",
  "Puzzle",
  "Adventure",
  "Racing",
  "Sports",
  "Strategy",
  "Arcade",
];

const SubmitGame = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    email: "",
    gameUrl: "",
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Game Submitted!",
      description: "Your game has been submitted for review.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Gamepad2 className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <h1 className="font-display text-xl font-bold tracking-wider">
              <span className="text-gradient">GAME</span>
              <span className="text-foreground">HUB</span>
            </h1>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Submit Your Game
            </h1>
            <p className="mt-2 text-muted-foreground">
              Join GameHub and reach players instantly. No fees, simple process.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Game Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Game Title
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Super Dash"
                className="h-12 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Short Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="What is your game about?"
                className="min-h-[120px] resize-none border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Category & Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Category
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="h-12 border-border bg-secondary">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card">
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat.toLowerCase()}
                        className="focus:bg-secondary"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Contact Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="h-12 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            {/* Game URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Game URL (HTML5)
              </label>
              <Input
                name="gameUrl"
                type="url"
                value={formData.gameUrl}
                onChange={handleInputChange}
                placeholder="https://itch.io/embed-game/..."
                className="h-12 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                required
              />
              <p className="text-xs text-muted-foreground">
                Direct link to your HTML5 game build or iframe compatible URL.
              </p>
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Thumbnail Image
              </label>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-8 transition-colors hover:border-primary/50 hover:bg-secondary">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="max-h-40 rounded-lg object-cover"
                  />
                ) : (
                  <>
                    <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      SVG, PNG, JPG or GIF (max 800x600 recommended)
                    </p>
                  </>
                )}
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="btn-gaming h-12 w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Submit Game
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmitGame;
