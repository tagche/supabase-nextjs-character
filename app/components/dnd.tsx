import { useDroppable, useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

/**
 * ドロップ対象エリア
 * @param props 
 * @returns 
 */
export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.5,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

/**
 * ドラッグ用ボタン
 * @param props 
 * @returns 
 */
export function Draggable(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}
