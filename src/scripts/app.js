"use strict";

import { PowerGlitch } from 'powerglitch';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const fightData = document.querySelector('.theydont__explaination');

if (window.location.pathname.endsWith("fight.html")) { //ChatGPT
    fetch('../assets/data/data.json')
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
            data.forEach(function(item) {

                let fightDiv = document.createElement('div');
                fightDiv.classList.add('theydont__div');
                fightDiv.classList.add('theydont__div--' + item.title.toLowerCase());


                let fightTitle = document.createElement('h4');
                fightTitle.textContent = item.title;
                fightDiv.appendChild(fightTitle);

                for (let i = 1; i < item.img.length + 1; i++) {
                    let fightImage = document.createElement('img');
                    fightImage.src = item.img[i-1];
                    fightImage.alt = item.title + i;
                    fightDiv.appendChild(fightImage);
                }

                fightData.appendChild(fightDiv);
            })

            // First 2 lines -> GSAP ScrollTrigger tips & mistakes
            const img = document.querySelectorAll('img');
            img.forEach(div => {
                gsap.from(div, {
                    x: -500,
                    scrollTrigger: {
                        trigger: div,
                        toggleActions: "restart pause reverse pause",
                        start: "top bottom",
                        end: "top center",
                        scrub: 1,
                        //pin: header,
                    }
                });
            });

            /*
            gsap.to(header, {
                scrollTrigger: {
                    trigger: header,
                    toggleActions: "restart pause reverse pause",
                    start: "top top",
                    pin: true,
                    pinType: "fixed",
                }
            })
            */
        });
}