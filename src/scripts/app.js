"use strict";

import { PowerGlitch } from 'powerglitch';
import { gsap } from "gsap";

const introTransition = document.querySelector('.transition');
const {
    startGlitch,
    stopGlitch
} = PowerGlitch.glitch(
    introTransition,
    {
        "hideOverflow": true,
        "timing": {
            "duration": 5000,
            "iterations": 1,
            "easing": "linear"
        },
        "glitchTimeSpan": {
            "end": 1
        },
        "shake": {
            "velocity": 33,
            "amplitudeX": 0.19,
            "amplitudeY": 0.21
        },
        "slice": {
            "count": 16,
            "minHeight": 0.01,
            "maxHeight": 0.46
        }
    }
);

stopGlitch();

/*
setTimeout(() => {
  introTransition.classList.add('hidden');
}, "5000")
*/

const burgerMenuButton = document.querySelector('.burger');
const quitButton = document.querySelector('.header__quit');
const burgerMenu = document.querySelector('header');

burgerMenuButton.addEventListener("click", function() {
    burgerMenu.classList.remove('hidden');
})

quitButton.addEventListener('click', function() {
    burgerMenu.classList.add('hidden');
})

