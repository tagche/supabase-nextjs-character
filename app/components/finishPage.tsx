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
        <section className='quizBox'>
            <div className="finishBox">
                <h1>ありがとうございました！</h1>
                <p className="finishMsg">最後までお付き合いくださりありがとうございました。<br />
                ソースコードは下記にて公開しています。</p>
                <p><a className="btnAccent" href="https://github.com/tagche/supabase-nextjs-portfolio" target="_blank">GitHubを見る</a></p>

                <article className="skillBox">
                <h2>Skills</h2>
                    <dl>
                        <dt>Front-End</dt>
                        <dd>React / Next.js / JavaScript(ES6) / WebGL(three.js) / SVG Animation / Pug / EJS / HTML / SCSS </dd>
                        <dt>Back-End</dt>
                        <dd>PHP / CakePHP / mySqL / PosgreSql / WordPress / Movable Type</dd>
                        <dt>Direction</dt>
                        <dd>Webディレクション / Web開発ディレクション</dd>
                    </dl>
                </article>
                <button className="btnAccent btnSmall" onClick={handleTop}>もう一度はじめから</button>
            </div>
        </section>
    )
}