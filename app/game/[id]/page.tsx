
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Maximize2, Share2, Info } from 'lucide-react'
import { notFound } from 'next/navigation'

export const revalidate = 60;

export default async function GamePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const { id } = params

    const { data: game, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !game) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
            {/* Top Bar */}
            <div className="bg-background border-b border-border/50 py-2">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-muted rounded-full transition-colors" title="Back to Home">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="font-bold text-lg line-clamp-1">{game.title}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground" title="Share (Mock)">
                            <Share2 className="h-5 w-5" />
                        </button>
                        {/* Fullscreen handled by user or iframe allowfullscreen attribute generally works, button is visual cue or needs client comp for true fullscreen API */}
                        <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground" title="Fullscreen">
                            <Maximize2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row container py-6 gap-6">
                <div className="flex-1 flex flex-col gap-4">
                    {/* Game Container */}
                    <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl relative group">
                        <iframe
                            src={game.game_url}
                            className="w-full h-full border-0"
                            allowFullScreen
                            allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
                            title={game.title}
                        />
                    </div>

                    {/* Description & metadata */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Info className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-2">About {game.title}</h2>
                                <p className="text-muted-foreground leading-relaxed">{game.description || 'No description available.'}</p>
                                <div className="mt-4 flex gap-2">
                                    <span className="px-3 py-1 bg-muted rounded-md text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        {game.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Ads */}
                <div className="w-full lg:w-80 flex flex-col gap-6">
                    {/* Ad Placeholder 1 */}
                    <div className="w-full aspect-[300/250] bg-muted/50 rounded-lg flex items-center justify-center border border-dashed text-muted-foreground text-sm">
                        Ad Placement (300x250)
                    </div>

                    {/* Ad Placeholder 2 */}
                    <div className="w-full aspect-[300/600] bg-muted/50 rounded-lg flex items-center justify-center border border-dashed text-muted-foreground text-sm hidden lg:flex">
                        Ad Placement (300x600)
                    </div>
                </div>
            </div>
        </div>
    )
}
