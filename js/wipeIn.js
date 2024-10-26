// Регистрация плагина
gsap.registerPlugin(ScrollTrigger);

function WipeElement(elementClass, classAdd, delay, transition, persent) {
    const element = document.querySelector(elementClass);
    element.classList.add(classAdd);
    const delayInMs = Number(delay) * 1000;

    ScrollTrigger.create({
        start: `top ${persent}%`, // Начало триггера
        trigger: element,
        onEnter: () => {
            element.style.animation = `wipeIn ${delay}s ${transition} forwards`; // Добавление анимации как стиль
            setTimeout(() => {
                element.classList.remove(classAdd);
                element.style.animation = "";
            }, delayInMs);
        }
    });
}

setTimeout(() => {
    WipeElement("#header", 'WipeHeader', 0.7, "ease", 70);
    WipeElement(".MainPhoto", 'WipeMainPhoto', 0.7, "ease", 70);
    WipeElement(".Social", 'WipeSocial', 0.7, "ease-in-out", 100);
    WipeElement("#darkMode", 'WipeSocial', 0.7, "ease-in-out", 100);
    WipeElement(".mobileHScroll ", 'WipeSocial', 0.7, "ease-in-out", 100);

    WipeElement(".AboutEndLine", 'WipeScroll', 0.7, "ease-in-out", 90);
    WipeElement(".EndLineContact", 'WipeScroll', 0.7, "ease-in-out", 80);

    WipeElement(".ContactMeSection", 'WipeScroll', 0.7, "ease-in-out", 70);
    WipeElement(".secondContainer", 'WipeScroll', 0.7, "ease", 90);
}, 0);
