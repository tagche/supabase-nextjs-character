'use client'

import React, { useEffect } from 'react'
import Gsap, { random } from "gsap"

export default function OpeningBg() {
    useEffect(() => {
        const randomX = random(-400, 400)
        const randomY = random(-200, 200)
        const randomDelay = random(0, 50)
        const randomTime = random(6, 12)
        const randomTime2 = random(5, 6)
        const randomAngle = random(-30, 150)

        const blurs = Gsap.utils.toArray(".blur")
        
        blurs.forEach((blur) => {
            Gsap.set(blur, {
                x: randomX(-1),
                y: randomX(1),
                rotation: randomAngle(-1)
            })

            moveX(blur, 1)
            moveY(blur, -1)
            rotate(blur, 1)
        })

        function rotate(target, direction) {
            Gsap.to(target, {
                rotation: randomAngle(direction),
                duration: randomTime2(),
                ease: 'expoScale',
                onComplete: rotate,
                onCompleteParams: [target, direction * -1]
            })
        }

        function moveX(target, direction) {
            Gsap.to(target, {
                x: randomX(direction),
                duration: randomTime(),
                ease: 'sine.inOut',
                onComplete: moveX,
                onCompleteParams: [target, direction * -1]
            })
        }

        function moveY(target, direction) {
            Gsap.to(target, {
                y: randomY(direction),
                duration: randomTime(),
                ease: 'sine.inOut',
                onComplete: moveY,
                onCompleteParams: [target, direction * -1]
            })
        }

        function random(min, max) {
            const delta = max - min
            return (direction = 1) => (min + delta * Math.random()) * direction
        }

        Gsap.to(".mask",
            {
                ease: 'power2.in',
                duration: 2,
                delay: 0,
                background: "radial-gradient(circle at center, rgba(255,255,255,0) 0, #fff 100%, #fff 100%)"
            }
        )
    })

    return (
        <div className="bgGradation">
            <div className="blur"></div>
            <div className="blur"></div>
            <div className="blur"></div>
            <div className="blur"></div>
            <div className="mask"></div>
        </div>
    )

}

