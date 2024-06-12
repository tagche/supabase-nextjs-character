import { useDroppable, useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { posix, relative } from 'path'

/**
 * ドロップ対象エリア
 * @param props 
 * @returns 
 */
export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });

    return (
        <div ref={setNodeRef} className="dropBox">
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
    const styles = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <button ref={setNodeRef} style={styles} className="answerBtn" {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}
