
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { GameCard, Game } from '@/components/GameCard'
import { clsx } from 'clsx'

export const revalidate = 60; // Revalidate every minute

export default async function Home(props: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await props.searchParams
  const category = searchParams.category

  let query = supabase
    .from('games')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (category) {
    // Basic case-insensitive matching if possible, but exact match for MVP
    query = query.ilike('category', category)
  }

  const { data: games, error } = await query

  if (error) {
    console.error("Supabase Error fetching games:", error);
  }

  const categories = ['Action', 'Puzzle', 'Racing', 'Arcade']

  return (
    <div className="container py-8 max-w-screen-2xl">
      {/* Hero / Welcome */}
      <section className="mb-10 text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Play Instantly on Playora
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          No downloads. No login. Just pure gaming fun.
        </p>
      </section>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <Link
          href="/"
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
            !category
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background hover:bg-muted border-input"
          )}
        >
          All Games
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/?category=${c.toLowerCase()}`}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
              category === c.toLowerCase()
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-muted border-input"
            )}
          >
            {c}
          </Link>
        ))}
      </div>

      {/* Game Grid */}
      {error && (
        <div className="text-center text-red-500 py-10">
          Failed to load games. Please try again later.
        </div>
      )}

      {!error && (!games || games.length === 0) ? (
        <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed hover:bg-muted/50 transition-colors cursor-pointer group">
          <p className="text-xl font-medium text-muted-foreground group-hover:text-primary transition-colors">
            No games found.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try a different category or come back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games?.map((game) => (
            <GameCard key={game.id} game={game as any} />
          ))}
        </div>
      )}
    </div>
  )
}
