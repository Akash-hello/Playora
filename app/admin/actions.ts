
'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updateGameStatus(id: string, status: 'approved' | 'rejected') {
    const { error } = await supabase
        .from('games')
        .update({ status })
        .eq('id', id)

    if (error) {
        throw new Error('Failed to update game status')
    }

    revalidatePath('/admin')
    revalidatePath('/')
}
