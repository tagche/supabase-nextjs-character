'use client';

import React, { useEffect } from 'react';
import Gsap, { random } from "gsap";

export default function OpeningBg() {
    useEffect(() => {
        Gsap.to(".mask",
            {
                ease: 'power2.inOut',
                duration: 2,
                delay: 1,
                background: "radial-gradient(circle at center, rgba(255,255,255,0) 0, #fff 100%, #fff 100%)"
            }
        )
    })

    return (
        <div className="bgGradation">
            <div className="mask"></div>
        </div>
    );

}

