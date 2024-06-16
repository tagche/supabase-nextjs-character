'use client';

import { useRecoilState } from "recoil";
import { loadingState, quizState } from '../atoms/atoms';
import QuizPanel from './quizPanel';
import OpeningAnim from './openingAnim';
import FinishPage from "./finishPage";

interface PropsType{
    QUIZ: any[] | null
    DB: any[] | null
}

export default function Container(props: PropsType){
    const QUIZ = props.QUIZ
    const DB = props.DB
    const [loading, setLoading] = useRecoilState(loadingState);
    const [quiz, setQuiz] = useRecoilState(quizState);

    const renderQuiz = () => QUIZ?.map((q, i) => {
        if(i == quiz){
            const choicesIds = q.choices.split(",");
            // 関連する選択肢のみを絞り込んで渡す
            const filterDB = choicesIds.map((id: number) => DB?.find(obj => obj["id"] === Number(id)) )

            return (
                <QuizPanel key={i} QUIZ={q} DB={filterDB} quizMax={QUIZ.length} />
            )
        }
    })

    return(
        <div className='container'>
            <OpeningAnim></OpeningAnim>
            {/* <ThreeMotion></ThreeMotion> */}
            { loading == "finish" && renderQuiz() }
            { QUIZ && quiz >= QUIZ.length && <FinishPage></FinishPage> }
        </div>
    )
}