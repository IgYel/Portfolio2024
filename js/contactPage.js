"use strict"

function randomChar() {
    const chars = `  ÈØàÞÚÐïíÛÕâäæîÖÝëå®¤êñ¬ã¥«ìª£§©çèðÿòôöþæíûõóùçëúï÷éщлпгюхя∂фшωсшλμτβρνσδπτξκμγηαψη
ΩΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω  `;
    return chars[Math.floor(Math.random() * chars.length)];
}

function shuffleText(text, revealCount) {
    // Generate a random string of the same length as the text
    const totalLength = text.length;
    const randomText = Array.from({ length: totalLength }, () => randomChar()).join('');
    // Replace characters with random ones if they are not yet revealed
    return text.split('').map((char, index) => index < revealCount ? char : randomText[index]).join('');
}

function animateShuffle(element, replacement, duration, callback) {
    const interval = 25; // Interval in ms between character change
    const steps = duration / interval;
    let currentStep = 0;
    let revealCount = 0;
    const originalText = element.textContent;
    const targetLength = replacement.length;

    // Function to start shuffling text
    function startShuffling() {
        const shuffleInterval = setInterval(() => {
            element.textContent = shuffleText(originalText, revealCount);
            currentStep++;

            if (currentStep >= steps / 2) {
                clearInterval(shuffleInterval);
                // Start revealing new text gradually
                const revealInterval = setInterval(() => {
                    if (revealCount < targetLength) {
                        revealCount++;
                    }
                    // Use the original length for shuffling, but reveal new text
                    element.textContent = shuffleText(replacement, revealCount);

                    if (revealCount >= targetLength) {
                        clearInterval(revealInterval);
                        if (callback) callback();
                    }
                }, interval);
            }
        }, interval);
    }

    startShuffling();
}

function handleMouseEnter(container) {
    container.querySelectorAll('.shuffle').forEach(element => {
        const newText = element.getAttribute('data-new-text');
        if (element.dataset.shuffled === 'true') {
            // If currently shuffled, animate back to original text
            animateShuffle(element, element.originalText, 300);
            element.dataset.shuffled = 'false';
        } else {
            // If currently original, animate to new text
            animateShuffle(element, newText, 400);
            element.dataset.shuffled = 'true';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.Credits');
    
    container.querySelectorAll('.shuffle').forEach(element => {
        element.dataset.shuffled = 'false'; // Initial state is not shuffled
        element.originalText = element.textContent;
    });
    
    container.addEventListener('mouseenter', () => handleMouseEnter(container));
});

//! SVG ELEMENT ANIMATION//

const SVGTextButton = document.querySelector('.ButtonToStart');

const SVGcontainer = document.querySelector('.SVGContainer');

const pathElement = SVGTextButton.querySelector('path');
const initialPath = 'M56 105L9 56.5L54.5 9.5';
const hoverPath = 'M67 72L9.5 39.5L67 9';
pathElement.setAttribute('d', initialPath);

SVGcontainer.addEventListener('mouseenter', () => {
  pathElement.setAttribute('d', hoverPath);
});

SVGcontainer.addEventListener('mouseleave', () => {
  pathElement.setAttribute('d', initialPath);
});

document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; // Current Scroll position
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const svg = document.querySelector('.ContactsLogoText');
    const paths = svg.querySelectorAll('path');

    // Maximum stroke-dashoffset values for each path
    const maxOffsets = [0, 0, 0, 0, 0, 480, 0, 0, 0, 0, 500, 0, 0, 0, 450, 0, 0, 500, 400];

    paths.forEach((path, index) => {
        const maxOffset = maxOffsets[index];
        const newOffset = (maxOffset - (maxOffset * scrollPosition / maxScroll)) * 7;
        path.style.strokeDasharray = `${maxOffset}px`;
        path.style.strokeDashoffset = `${newOffset}px`;
    });
});

SVGcontainer.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
