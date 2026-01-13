
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function SubmitGame() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const category = formData.get('category') as string
        const gameUrl = formData.get('gameUrl') as string
        const developerEmail = formData.get('developerEmail') as string
        const thumbnailFile = formData.get('thumbnail') as File

        if (!thumbnailFile || thumbnailFile.size === 0) {
            setError('Please upload a thumbnail.')
            setLoading(false)
            return
        }

        try {
            // 1. Upload Thumbnail
            const fileExt = thumbnailFile.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('thumbnails')
                .upload(filePath, thumbnailFile)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('thumbnails')
                .getPublicUrl(filePath)

            // 2. Insert Game
            const { error: insertError } = await supabase
                .from('games')
                .insert({
                    title,
                    description,
                    category,
                    game_url: gameUrl,
                    developer_email: developerEmail,
                    thumbnail_url: publicUrl,
                    status: 'pending' // Default, but being explicit
                })

            if (insertError) throw insertError

            setSuccess(true)
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="container max-w-lg py-20 text-center">
                <div className="bg-green-500/10 text-green-500 p-6 rounded-full inline-block mb-6">
                    <CheckCircle className="h-12 w-12" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Submission Received!</h1>
                <p className="text-muted-foreground mb-8">
                    Your game has been submitted successfully and is pending review.
                    We will notify you via email once it's approved.
                </p>
                <Link href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Back to Home
                </Link>
            </div>
        )
    }

    return (
        <div className="container max-w-2xl py-10">
            <div className="mb-8 ">
                <h1 className="text-3xl font-bold">Submit Your Game</h1>
                <p className="text-muted-foreground mt-2">
                    Join Playora and reach players instantly. No fees, simple process.
                </p>
            </div>

            {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="title">Game Title</label>
                    <input required name="title" id="title" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="e.g. Super Dash" />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="description">Short Description</label>
                    <textarea required name="description" id="description" rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="What is your game about?" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="category">Category</label>
                        <select required name="category" id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option value="action">Action</option>
                            <option value="puzzle">Puzzle</option>
                            <option value="racing">Racing</option>
                            <option value="arcade">Arcade</option>
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="developerEmail">Contact Email</label>
                        <input required type="email" name="developerEmail" id="developerEmail" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="you@example.com" />
                    </div>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="gameUrl">Game URL (HTML5)</label>
                    <input required type="url" name="gameUrl" id="gameUrl" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="https://itch.io/embed-game/..." />
                    <p className="text-[0.8rem] text-muted-foreground">Direct link to your HTML5 game build or iframe compatible URL.</p>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="thumbnail">Thumbnail Image</label>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors relative cursor-pointer">
                        <input required type="file" name="thumbnail" id="thumbnail" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max 800x600 recommended)</p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        'Submit Game'
                    )}
                </button>
            </form>
        </div>
    )
}
