
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'

export type Game = {
    id: string
    title: string
    category: string
    thumbnail_url: string | null
}

export function GameCard({ game }: { game: Game }) {
    // Use a placeholder if no thumbnail
    const thumbnail = game.thumbnail_url || 'https://placehold.co/600x400/1a1a1a/ffffff?text=No+Image'

    return (
        <Link
            href={`/game/${game.id}`}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:scale-[1.02] hover:shadow-lg"
        >
            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                <Image
                    src={thumbnail}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="h-12 w-12 text-white fill-white" />
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold tracking-tight text-lg line-clamp-1">{game.title}</h3>
                <p className="text-sm text-muted-foreground capitalize">{game.category || 'Arcade'}</p>
            </div>
        </Link>
    )
}
