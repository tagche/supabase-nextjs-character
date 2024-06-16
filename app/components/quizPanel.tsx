'use client';

import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { quizState } from '../atoms/atoms';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Droppable, Draggable } from './dnd';
import Gsap from "gsap";
import { nl2br } from '../util/util';

interface propsType{
    QUIZ: any
    DB: any
    quizMax: number
}
export default function QuizPanel(props: propsType) {
    const QUIZ = props.QUIZ
    const DB   = props.DB
    const quizMax = props.quizMax
    const [parent, setParent] = useState(Array)
    const [answer, setAnswer] = useState(Number)
    const [quiz, setQuiz] = useRecoilState(quizState);
    const [nextid, setNextid] = useState(Number)

    // 選択肢エレメントを生成
    const createDraggable = () => DB.map((ans: any, i: number) => 
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
        if(guide){
            const spread = guide.textContent?.split("")
            const spreadGuide = spread ? spread
                .map((e) => {
                    return e !== " " 
                        ? `<span style="display: inline-block;">${e}</span>`
                        : `<span style="display: inline-block; min-width: .25em;">${e}</span>`
                })
                .join("")
                : "";

                guide.innerHTML = spreadGuide
        }

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
                    {DB.map((ans: any, i: number) => parent[i] === "choiceA" && createDraggable()[i])}
                </Droppable>

                <div className='answerBtnWrap'>
                    {DB.map((ans: any, i: number) => parent[i] === undefined ? createDraggable()[i] : undefined)}
                </div>
            </DndContext>
        </section>
    );

    /**
     * 選択肢移動後の配置情報をステート管理（setParent）
     * @param param 
     */
    function handleDragEnd(event: DragEndEvent) {
        const {over, active} = event
        const regex = /[0-9]{1,3}/g;

        let result = new Array;
        if(over){
            DB.map((ans: any, i: number) => result.push(active.id !== `draggable-${ans.id}` ? undefined : over.id));
            if((active.id as any).match(regex) == answer) setQuiz(quiz + 1)
            else if(nextid) setQuiz(nextid)
            else console.log("NG!");
        }else{
            DB.map((ans: any, i: number) => result.push(active.id !== `draggable-${ans.id}` ? parent[i] : undefined));
        }
        setParent([...result])
    }
}

