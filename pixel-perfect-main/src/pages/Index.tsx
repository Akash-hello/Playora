import { useState, useMemo } from "react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import Footer from "@/components/Footer";

import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";
import game4 from "@/assets/game-4.jpg";
import game5 from "@/assets/game-5.jpg";
import game6 from "@/assets/game-6.jpg";
import game7 from "@/assets/game-7.jpg";
import game8 from "@/assets/game-8.jpg";

const gamesData = [
  {
    id: 1,
    title: "Neon Blocks",
    developer: "PixelWave Studios",
    category: "Puzzle",
    imageUrl: game1,
    plays: "125K",
  },
  {
    id: 2,
    title: "Turbo Rush",
    developer: "SpeedCore Games",
    category: "Racing",
    imageUrl: game2,
    plays: "89K",
  },
  {
    id: 3,
    title: "Blade of Light",
    developer: "Mythic Games",
    category: "Adventure",
    imageUrl: game3,
    plays: "204K",
  },
  {
    id: 4,
    title: "Galaxy Blaster",
    developer: "Retro Arcade Inc",
    category: "Arcade",
    imageUrl: game4,
    plays: "156K",
  },
  {
    id: 5,
    title: "Castle Siege",
    developer: "StrategyMind",
    category: "Strategy",
    imageUrl: game5,
    plays: "67K",
  },
  {
    id: 6,
    title: "Pro Soccer 26",
    developer: "SportZone",
    category: "Sports",
    imageUrl: game6,
    plays: "312K",
  },
  {
    id: 7,
    title: "Shadow Detective",
    developer: "Noir Interactive",
    category: "Puzzle",
    imageUrl: game7,
    plays: "45K",
  },
  {
    id: 8,
    title: "Dead City",
    developer: "Survival Games Co",
    category: "Action",
    imageUrl: game8,
    plays: "178K",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all-games");

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = category === "all-games" || 
        game.category.toLowerCase() === category.replace("-", " ");
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, category]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="container relative mx-auto px-4 py-16 text-center">
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              <span className="text-gradient">Play Amazing</span>
              <br />
              <span className="text-foreground">HTML5 Games</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Discover and play thousands of free browser games. No downloads required.
            </p>
          </div>
        </section>

        {/* Games Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-display text-2xl font-semibold text-foreground">
              {category === "all-games" ? "All Games" : category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            <span className="text-sm text-muted-foreground">
              {filteredGames.length} games found
            </span>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  developer={game.developer}
                  category={game.category}
                  imageUrl={game.imageUrl}
                  plays={game.plays}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 text-6xl">🎮</div>
              <h4 className="mb-2 font-display text-xl font-semibold text-foreground">
                No games found
              </h4>
              <p className="text-muted-foreground">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
