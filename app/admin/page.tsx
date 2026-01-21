
'use client'

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, XCircle, ExternalLink, Clock, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type Game = {
    id: string
    title: string
    description: string
    category: string
    thumbnail_url: string
    game_url: string
    status: 'pending' | 'approved' | 'rejected'
    created_at: string
}

export default function AdminDashboard() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        checkUser()
        fetchGames()
    }, [])

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            router.push('/admin/login')
        } else {
            setUser(user)
        }
    }

    async function fetchGames() {
        try {
            const { data, error } = await supabase
                .from('games')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) console.error('Error fetching games:', error)
            if (data) setGames(data as Game[])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    async function updateStatus(id: string, status: 'approved' | 'rejected') {
        // Optimistic update
        setGames(games.map(g => g.id === id ? { ...g, status } : g))

        const { error } = await supabase
            .from('games')
            .update({ status })
            .eq('id', id)

        if (error) {
            console.error('Error updating status:', error)
            // Revert on error (could be more sophisticated)
            fetchGames()
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading dashboard...</div>
    }

    return (
        <div className="container py-10 max-w-screen-xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>
                    <p className="text-sm text-muted-foreground mt-1">Logged in as {user?.email}</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="text-sm font-medium">Pending: {games.filter(g => g.status === 'pending').length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-sm font-medium">Approved: {games.filter(g => g.status === 'approved').length}</span>
                    </div>
                    <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Game</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Submitted</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {games.map((game) => (
                                <tr key={game.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {game.thumbnail_url && (
                                                <div className="h-10 w-16 relative overflow-hidden rounded bg-muted shrink-0">
                                                    <Image src={game.thumbnail_url} alt="" fill className="object-cover" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-medium text-foreground line-clamp-1">{game.title}</div>
                                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">{game.description}</div>
                                                <a href={game.game_url} target="_blank" className="text-xs text-primary hover:underline flex items-center gap-1 mt-1">
                                                    Test Link <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 capitalize">{game.category}</td>
                                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                                        {new Date(game.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {game.status === 'pending' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600"><Clock className="mr-1 h-3 w-3" /> Pending</span>}
                                        {game.status === 'approved' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600"><CheckCircle className="mr-1 h-3 w-3" /> Live</span>}
                                        {game.status === 'rejected' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-600"><XCircle className="mr-1 h-3 w-3" /> Rejected</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => updateStatus(game.id, 'approved')}
                                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
                                                title="Approve"
                                            >
                                                <CheckCircle className="h-5 w-5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => updateStatus(game.id, 'rejected')}
                                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                                                title="Reject"
                                            >
                                                <XCircle className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {games.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">No games found.</div>
                )}
            </div>
        </div>
    )
}
