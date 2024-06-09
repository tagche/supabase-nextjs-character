import { createClient } from '@/utils/supabase/server';
import DragDropWrap from './dragDropWrap';

export default async function Home() {
    const supabase = createClient(); 
    const { data: DB, error } = await supabase.from('nextjs-quiz-charadata').select('*')

    return(
        <main className="flex flex-col items-center justify-between p-24">
            <h1>Test DnD</h1>
            <section>
                <DragDropWrap DB={DB} />
            </section>
        </main>
    )
}

