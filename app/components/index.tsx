'use client';

import { useRecoilState } from "recoil";
import { loadingState, quizState } from '../atoms/atoms';
import QuizPanel from './quizPanel';
import OpeningAnim from './openingAnim';

export default function Container({QUIZ, DB}){
    const [loading, setLoading] = useRecoilState(loadingState);
    const [quiz, setQuiz] = useRecoilState(quizState);

    const renderQuiz = () => QUIZ.map((q, i) => {
        if(i == quiz){
            const choicesIds = q.choices.split(",");
            // 関連する選択肢のみを絞り込んで渡す
            const filterDB = choicesIds.map(id => DB.find(obj => obj["id"] === Number(id)) )

            return (
                <QuizPanel key={i} QUIZ={q} choicesIds={choicesIds} DB={filterDB}  />
            )
        }
    })

    const finishQuiz = () => {
        return(
            <p>クイズ終了</p>
        )
    }

    return(
        <div className='container'>
            <OpeningAnim></OpeningAnim>
            { loading == "finish" && renderQuiz() }
            { quiz == QUIZ.length && finishQuiz() }
        </div>
    )
}