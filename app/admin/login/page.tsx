
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.refresh()
            router.push('/admin')
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-card p-10 rounded-xl border border-border shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">Admin Login</h2>
                </div>
                {error && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm text-center">
                        {error}
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-t-md border border-input bg-background px-3 py-2 text-sm focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full rounded-b-md border border-input bg-background px-3 py-2 text-sm focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                        >
                            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
