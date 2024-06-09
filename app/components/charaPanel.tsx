import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable, Draggable } from './dnd';

export default function CharaPanel(props) {
    // console.log(props.list[0]);
    const [parent, setParent] = useState(null);

    const draggable = (
        <Draggable id="draggable">
            {props.list[0].charaname}
        </Draggable>
    );
  
    return (
        <DndContext onDragEnd={handleDragEnd}>
            {!parent ? draggable : null}
            <Droppable id="droppable">
                {parent === "droppable" ? draggable : 'Drop here'}
            </Droppable>
        </DndContext>
    );
  
    function handleDragEnd({over}) {
        setParent(over ? over.id : null);
    }
}

