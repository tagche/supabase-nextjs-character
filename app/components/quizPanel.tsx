'use client';

import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable, Draggable } from './dnd';

export default function QuizPanel({DB, ANSWERS}) {
    const [parent, setParent] = useState(Array);

    // 選択肢エレメントを生成
    const createDraggable = () => DB.map((chara) => 
        <Draggable key={`draggable-${chara.id}`} id={`draggable-${chara.id}`}>
            {chara.charaname}
        </Draggable>
    )
  
    return (
        <DndContext onDragEnd={handleDragEnd}>
            { DB.map((chara, i) => parent[i] === undefined ? createDraggable()[i] : undefined) }
            
            <Droppable id="choiceA">
                <h2>Selected Item</h2>
                { DB.map((chara, i) => parent[i] === "choiceA" && createDraggable()[i]) }
            </Droppable>
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

