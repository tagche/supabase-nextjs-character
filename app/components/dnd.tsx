import React, { useEffect } from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import Gsap from "gsap";

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

    useEffect(() => {
        Gsap.fromTo('.answerBtn',
            {
                autoAlpha: 0,
                ease: "power1.out",
                y: 50
            },
            {
                display: "inline-block",
                autoAlpha: 1,
                duration: .5,
                delay: 0,
                y: 0,
                stagger: 0.015,
            });
    }, []);

    return (
        <button ref={setNodeRef} style={styles} className={"answerBtn answerBtn-" + props.id} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}
