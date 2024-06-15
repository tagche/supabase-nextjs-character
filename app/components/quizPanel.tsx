'use client';

import { createElement, type ReactNode } from 'react'
import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable, Draggable } from './dnd';
import Gsap from "gsap";

const nl2br = (text: string) =>
    text
      .split('\n')
      .map((line, index) => [line, createElement('br', { key: index })])
      .flat()
      .slice(0, -1)

export default function QuizPanel({title, choicesIds, DB}) {
    const [parent, setParent] = useState(Array);
    
    // 選択肢エレメントを生成
    const createDraggable = () => DB.map((chara, i) => 
        <Draggable key={`draggable-${chara.id}`} id={`draggable-${i}`}>
            <h4>{chara.title}</h4>
            {chara.hobby && <p><small>{chara.hobby}</small></p>}
        </Draggable>
    )

    useEffect(() => {
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
                repeatDelay: 4,
                stagger: 0.015,
            });
    }, []);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <Droppable id="choiceA">
                <h1>{nl2br(title)}</h1>
                <h2 className='text-dropguide'>Drop Your Choice, here</h2>
                {DB.map((chara, i) => parent[i] === "choiceA" && createDraggable()[i])}
            </Droppable>

            <div className='answerBtnWrap'>
                {DB.map((chara, i) => parent[i] === undefined ? createDraggable()[i] : undefined)}
            </div>
        </DndContext>
    );

    /**
     * 選択肢移動後の配置情報をステート管理（setParent）
     * @param param 
     */
    function handleDragEnd({over, active}) {
        let result = [];
        if(over){
            DB.map((chara, i) => result.push(active.id !== `draggable-${i}` ? undefined : over.id));
        }else{
            DB.map((chara, i) => result.push(active.id !== `draggable-${i}` ? parent[i] : undefined));
        }
        setParent([...result])
    }
}

