import { createClient } from '@/utils/supabase/server';
import QuizPanel from './components/quizPanel';

export default async function Home() {
    const supabase = createClient(); 
    const { data: DB, error } = await supabase.from('nextjs-quiz-charadata').select('*')
    const { data: ANSWERS }       = await supabase.from('nextjs-quiz-answers').select('*')

    return(
        <main className="flex flex-col items-center justify-between p-24">
            <h1>Test DnD</h1>
            <section>
                <QuizPanel DB={DB} ANSWERS={ANSWERS} />
            </section>
        </main>
    )
}

