import { createClient } from '@/utils/supabase/server';
import QuizPanel from './components/quizPanel';

export default async function Home() {
    const supabase = createClient(); 
    const { data: DB, error } = await supabase.from('nextjs-quiz-choices').select('*')
    const { data: QUIZ }       = await supabase.from('nextjs-quiz').select('*')

    const renderQuiz = () => QUIZ.map(q => {
        const choicesIds = q.choices.split(",");
        // 関連する選択肢のみを絞り込んで渡す
        const filterDB = choicesIds.map(id => DB.find(obj => obj["id"] === Number(id)) )

        return (
            <section>
                <QuizPanel title={q.question} choicesIds={choicesIds} DB={filterDB} />
            </section>
        )
    })

    return(
        <main className="flex flex-col items-center justify-between p-24">
            {renderQuiz()}
        </main>
    )
}

