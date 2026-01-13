
import Link from 'next/link'
import { MonitorPlay } from 'lucide-react'

export function Navbar() {
    return (
        <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl hover:text-primary transition-colors">
                    <MonitorPlay className="h-6 w-6" />
                    <span>Playora</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link
                        href="/submit"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Submit Game
                    </Link>
                </div>
            </div>
        </nav>
    )
}
