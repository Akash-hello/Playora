import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Maximize2, Share2, Info } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic';

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
        <div className="flex flex-col min-h-screen">
            {/* Top Bar (Breadcrumb style) */}
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 py-4">
                <div className="container mx-auto px-4 max-w-screen-2xl flex items-center justify-between">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Games
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <h1 className="font-display font-bold text-lg hidden sm:block mr-4 text-primary">{game.title}</h1>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <Maximize2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 container mx-auto px-4 py-8 max-w-screen-2xl flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Game Frame */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black ring-1 ring-border/50">
                        <iframe
                            src={game.game_url}
                            className="w-full h-full border-0"
                            allowFullScreen
                            allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
                            title={game.title}
                        />
                    </div>

                    {/* Info Card */}
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Info className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-4 flex-1">
                                <div>
                                    <h2 className="text-2xl font-display font-bold mb-2">{game.title}</h2>
                                    <div className="flex gap-2">
                                        <Badge variant="secondary" className="uppercase tracking-wider font-semibold">
                                            {game.category}
                                        </Badge>
                                        <Badge variant="outline" className="border-border">
                                            HTML5
                                        </Badge>
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {game.description || 'No description available for this game.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 space-y-6">
                    {/* Ad Placeholder 1 */}
                    <div className="w-full aspect-[300/250] bg-muted/30 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-border text-muted-foreground">
                        <span className="text-xs uppercase font-bold tracking-widest opacity-50">Advertisement</span>
                        <span className="text-sm">300x250</span>
                    </div>

                    <div className="w-full aspect-[300/600] bg-muted/30 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-border text-muted-foreground hidden lg:flex">
                        <span className="text-xs uppercase font-bold tracking-widest opacity-50">Advertisement</span>
                        <span className="text-sm">300x600</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
