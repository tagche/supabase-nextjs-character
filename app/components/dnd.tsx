import React, { useEffect } from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import Gsap from "gsap";

/**
 * ドロップ対象エリア
 * @param props 
 * @returns 
 */
export function Droppable(props: any) {
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
export function Draggable(props: any) {
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
                ease: "power3.inOut",
                transform: "translate(0, 50%) scale(0.8)"
            },
            {
                display: "inline-block",
                autoAlpha: 1,
                duration: .4,
                delay: 0,
                transform: "translate(0, 0) scale(1)",
                stagger: 0.08,
            });
    }, []);

    return (
        <button ref={setNodeRef} style={styles} className={"answerBtn answerBtn-" + props.id} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}
