import Link from 'next/link'
import Image from 'next/image'
import { Play, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type Game = {
    id: string
    title: string
    category: string
    thumbnail_url: string | null
}

export function GameCard({ game }: { game: Game }) {
    const thumbnail = game.thumbnail_url || 'https://placehold.co/600x400/1a1a1a/ffffff?text=No+Image'
    const developer = "Playora"
    const plays = "10K+"

    return (
        <Link href={`/game/${game.id}`} className="block h-full">
            <div className="card-hover group relative overflow-hidden rounded-xl border border-border bg-card h-full flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                        src={thumbnail}
                        alt={game.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-110">
                            <Play className="h-7 w-7 fill-current" />
                        </div>
                    </div>

                    {/* Category Badge */}
                    <Badge className="absolute right-3 top-3 border-0 bg-accent/90 font-medium text-accent-foreground capitalize">
                        {game.category}
                    </Badge>
                </div>

                {/* Content */}
                <div className="p-4 flex-1">
                    <h3 className="mb-1 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary line-clamp-1">
                        {game.title}
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
        </Link>
    )
}
