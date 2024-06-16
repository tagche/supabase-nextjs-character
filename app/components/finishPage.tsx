import { useRecoilState } from "recoil";
import { loadingState, quizState } from '../atoms/atoms';

export default function FinishPage(){
    const [loading, setLoading] = useRecoilState(loadingState);
    const [quiz, setQuiz] = useRecoilState(quizState);

    const handleTop = () => {
        setLoading("finish");
        setQuiz(0);
    }

    return(
        <section>
            <h1>終了です！</h1>
            <p>ここまでお付き合いくださりありがとうございました。<br />
            ソースコードは下記にて公開しています。</p>
            <p><a href="https://github.com/tagche/supabase-nextjs-portfolio" target="_blank">https://github.com/tagche/supabase-nextjs-portfolio</a></p>

            <button onClick={handleTop}>トップへ</button>
        </section>
    )
}