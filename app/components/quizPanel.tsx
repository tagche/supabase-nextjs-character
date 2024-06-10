'use client';

import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable, Draggable } from './dnd';

// Styles
const draggableAreaStyle = {
    display: "flex",
    justifyContent: "space-around"
}

export default function QuizPanel({title, choicesIds, DB}) {
    const [parent, setParent] = useState(Array);
    
    // console.log(choicesIds);
    
    
    // 選択肢エレメントを生成
    const createDraggable = () => DB.map((chara) => 
        <Draggable key={`draggable-${chara.id}`} id={`draggable-${chara.id}`}>
            <h4>{chara.title}</h4>
            {chara.hobby && <p><small>趣味：{chara.hobby}</small></p>}
        </Draggable>
    )

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <h1>{title}</h1>
            <Droppable id="choiceA">
                <h2>Drag Your Choice</h2>
                {DB.map((chara, i) => parent[i] === "choiceA" && createDraggable()[i])}
            </Droppable>

            <div style={draggableAreaStyle}>
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
            DB.map((chara, i) => result.push(active.id !== `draggable-${chara.id}` ? parent[i] : over.id));
        }else{
            DB.map((chara, i) => result.push(active.id !== `draggable-${chara.id}` ? parent[i] : undefined));
        }
        setParent([...result])
    }
}

