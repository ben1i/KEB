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
    fetch('./assets/data/data.json')
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
                    fightImage.srcset = item.srcset[i-1];
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

if (window.location.pathname.endsWith("joinus.html")) {

    const form = document.querySelector('.keb__form');
    const rejected = document.querySelector('.rejected');
    const reception = document.querySelector('.received');
    const formSection = document.querySelector('.joinus');

    var answer = localStorage.getItem('approval');
    if (answer === 'rejected') {
        formSection.classList.add('hidden');

        let rejectionMessage = document.createElement('span');
        rejectionMessage.textContent = "Sorry, you must be at least 18 years old to join. Your application has been rejected.";
        rejected.appendChild(rejectionMessage);
        rejected.classList.remove('hidden');
        reception.classList.add('hidden');
    } else if (answer === 'approved') {
        formSection.classList.add('hidden');
        rejected.classList.add('hidden');
        reception.classList.remove('hidden');
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var gender = document.getElementById('gender').value;
        var role = document.getElementById('role').value;

        var Bdate = document.getElementById('birthday').value;
        // Next 2 lines are from stackoverflow.com (https://stackoverflow.com/questions/21336881/how-to-get-the-age-from-input-type-date-using-html-js)
        var Bday = +new Date(Bdate);
        var age = ~~((Date.now() - Bday) / (31557600000));
        if (age < 18) {
            localStorage.setItem('approval', 'rejected');
            formSection.classList.add('hidden');

            rejected.classList.remove('hidden');
            reception.classList.add('hidden');
        } else if (role != "select" && gender != "select") {
            localStorage.setItem('approval', 'approved');

            formSection.classList.add('hidden');
            rejected.classList.add('hidden');
            reception.classList.remove('hidden');
        }
    })
}

const pagesHeader = document.querySelector('header');
const headerQuit = document.querySelector('.header__quit');
const kebImages = document.querySelectorAll('.keb__images');
const explainationImages = document.querySelectorAll('.explaination__images');
if (window.innerWidth > 1200) {
    pagesHeader.classList.remove('hidden');
    headerQuit.classList.add('hidden');

    if (!window.location.pathname.endsWith("fight.html")) {
        kebImages.forEach(function(image) {
            image.classList.remove('hidden');
        });
    }

    explainationImages.forEach(function(image) {
        image.classList.add('hidden');
    })
}

/* Code pour l'agenda (à voir) -> Google Gemini

if (window.location.pathname.endsWith("agenda.html") || window.location.pathname.includes("/agenda")) {
    const agendaGrid = document.querySelector('.agenda__grid-container');
    const currentMonthYearElement = document.getElementById('currentMonthYear');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');

    // S'assurer que les éléments existent avant de continuer
    if (agendaGrid && currentMonthYearElement && prevMonthBtn && nextMonthBtn) {
        let displayDate = new Date(); // Date utilisée pour l'affichage du calendrier

        function renderAgenda(year, month) {
            agendaGrid.innerHTML = ''; // Vider la grille précédente
            displayDate.setFullYear(year, month, 1); // Aller au premier jour du mois à afficher

            const monthName = displayDate.toLocaleString('fr-FR', { month: 'long' }); // Mois en français
            const currentYear = displayDate.getFullYear();
            currentMonthYearElement.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${currentYear}`;

            // getDay(): 0 (Dimanche) - 6 (Samedi). Ajustons pour que Lundi soit 0.
            const firstDayOfMonthIndex = (new Date(year, month, 1).getDay() + 6) % 7; 
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            const today = new Date();
            const todayDate = today.getDate();
            const todayMonth = today.getMonth();
            const todayYear = today.getFullYear();

            // Créer les cellules vides pour les jours avant le début du mois dans la grille de 5 colonnes
            for (let i = 0; i < firstDayOfMonthIndex; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('agenda__day-cell', 'empty');
                agendaGrid.appendChild(emptyCell);
            }

            // Créer les cellules pour chaque jour du mois
            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.classList.add('agenda__day-cell');
                dayCell.textContent = day;

                if (day === todayDate && month === todayMonth && year === todayYear) {
                    dayCell.classList.add('current-day');
                }
                agendaGrid.appendChild(dayCell);
            }

            // Remplir les cellules vides restantes pour compléter la dernière ligne visuelle de 5
            const totalCellsRendered = firstDayOfMonthIndex + daysInMonth;
            const remainingCellsToFillGrid = (5 - (totalCellsRendered % 5)) % 5;
            if (remainingCellsToFillGrid > 0) {
                for (let i = 0; i < remainingCellsToFillGrid; i++) {
                    const emptyCell = document.createElement('div');
                    emptyCell.classList.add('agenda__day-cell', 'empty');
                    agendaGrid.appendChild(emptyCell);
                }
            }
        }

        prevMonthBtn.addEventListener('click', () => {
            displayDate.setMonth(displayDate.getMonth() - 1);
            renderAgenda(displayDate.getFullYear(), displayDate.getMonth());
        });

        nextMonthBtn.addEventListener('click', () => {
            displayDate.setMonth(displayDate.getMonth() + 1);
            renderAgenda(displayDate.getFullYear(), displayDate.getMonth());
        });

        // Affichage initial de l'agenda pour le mois courant
        renderAgenda(displayDate.getFullYear(), displayDate.getMonth());
    }
}
*/