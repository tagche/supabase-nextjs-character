'use client';

import { useRecoilState } from "recoil";
import { loadingState } from '../../atoms/atoms';
import QuizPanel from '../quizPanel';
import OpeningAnim from '../openingAnim';

export default function Container({QUIZ, DB}){
    const [loading, setLoading] = useRecoilState(loadingState);

    const renderQuiz = () => QUIZ.map(q => {
        const choicesIds = q.choices.split(",");
        // 関連する選択肢のみを絞り込んで渡す
        const filterDB = choicesIds.map(id => DB.find(obj => obj["id"] === Number(id)) )

        return (
            <section className='quizBox' key={q.id}>
                <QuizPanel title={q.question} choicesIds={choicesIds} DB={filterDB} />
            </section>
        )
    })

    return(
        <div className='container'>
            <OpeningAnim></OpeningAnim>
            { loading == "finish" && renderQuiz() }
        </div>
    )
}