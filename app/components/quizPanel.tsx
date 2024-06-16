'use client';

import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { quizState } from '../atoms/atoms';
import { DndContext } from '@dnd-kit/core';
import { Droppable, Draggable } from './dnd';
import Gsap from "gsap";
import { nl2br } from '../util/util';
import next from 'next'

export default function QuizPanel({QUIZ, DB, quizMax}) {
    const [parent, setParent] = useState(Array)
    const [answer, setAnswer] = useState(Number)
    const [quiz, setQuiz] = useRecoilState(quizState);
    const [nextid, setNextid] = useState(Number)

    // 選択肢エレメントを生成
    const createDraggable = () => DB.map((ans, i) => 
        <Draggable key={`draggable-${ans.id}`} id={`draggable-${ans.id}`}>
            <h4>{nl2br(ans.title)}</h4>
            {ans.option && <p>{nl2br(ans.option)}</p>}
        </Draggable>
    )

    useEffect(() => {
        setAnswer(QUIZ.answer)
        setNextid(QUIZ.nextid)

        Gsap.fromTo('.quizBox', 
            {
                autoAlpha: 0,
                ease: "power1.out",
                y: 20
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: .5
            }
        );

        // DropYourChoice,here
        const guide = document.querySelector(".text-dropguide")
        const spreadGuide = [...guide.textContent]
            .map((e) => {
                return e !== " " 
                    ? `<span style="display: inline-block;">${e}</span>`
                    : `<span style="display: inline-block; min-width: .25em;">${e}</span>`
            })
            .join("");
        guide.innerHTML = spreadGuide

        Gsap.fromTo('.text-dropguide span', 
            {
                autoAlpha: 0,
                ease: "power1.out"
            },
            {
                autoAlpha: 1,
                repeat: -1,
                repeatDelay: 3,
                stagger: 0.015,
            }
        );
    }, []);

    return (
        <section className='quizBox'>
            <p className="pager">{Number(quiz) + 1}/{quizMax}</p>
            <DndContext onDragEnd={handleDragEnd}>
                <Droppable id="choiceA">
                    <h1>{nl2br(QUIZ.question)}</h1>
                    <h2 className='text-dropguide'>Drop Your Choice, here</h2>
                    {DB.map((ans, i) => parent[i] === "choiceA" && createDraggable()[i])}
                </Droppable>

                <div className='answerBtnWrap'>
                    {DB.map((ans, i) => parent[i] === undefined ? createDraggable()[i] : undefined)}
                </div>
            </DndContext>
        </section>
    );

    /**
     * 選択肢移動後の配置情報をステート管理（setParent）
     * @param param 
     */
    function handleDragEnd({over, active}) {
        let result = [];
        if(over){
            DB.map((ans, i) => result.push(active.id !== `draggable-${ans.id}` ? undefined : over.id));
            if(active.id.slice(-1) == answer) setQuiz(String(Number(quiz) + 1))
            else if(nextid) setQuiz(String(Number(nextid)))
            else console.log("NG!");
        }else{
            DB.map((ans, i) => result.push(active.id !== `draggable-${ans.id}` ? parent[i] : undefined));
        }
        setParent([...result])
    }
}

