import { supabase } from '@/lib/supabase'
import { GameCard, Game } from '@/components/GameCard'

export const dynamic = 'force-dynamic';

export default async function Home(props: {
  searchParams: Promise<{ category?: string, q?: string }>
}) {
  const searchParams = await props.searchParams
  const category = searchParams.category
  const queryParam = searchParams.q

  let query = supabase
    .from('games')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (category && category !== 'all-games') {
    // Basic case-insensitive matching
    query = query.ilike('category', category)
  }

  if (queryParam) {
    query = query.ilike('title', `%${queryParam}%`)
  }

  const { data: games, error } = await query

  const displayCategory = category
    ? category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())
    : "All Games"

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container relative mx-auto px-4 py-16 text-center max-w-screen-2xl">
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
      <section className="container mx-auto px-4 py-12 max-w-screen-2xl">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold text-foreground">
            {queryParam ? `Search: ${queryParam}` : displayCategory}
          </h3>
          <span className="text-sm text-muted-foreground">
            {games?.length || 0} games found
          </span>
        </div>

        {error && (
          <div className="text-center text-red-500 py-10">
            Failed to load games. Please check your connection.
          </div>
        )}

        {!error && (!games || games.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-6xl">🎮</div>
            <h4 className="mb-2 font-display text-xl font-semibold text-foreground">
              No games found
            </h4>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {games?.map((game) => (
              <GameCard key={game.id} game={game as Game} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
