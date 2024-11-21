const Cursor = document.querySelector('#Cursor');

let cursorX = 0, cursorY = 0;
let targetX = 0, targetY = 0;
const delay = 0.05;

const TextContainer1 = document.querySelector('#TextContainer1');
const ScrollerText1 = document.querySelector('#ScrollerText1');

const TextContainer2 = document.querySelector('#TextContainer2');
const ScrollerText2 = document.querySelector('#ScrollerText2');

const TextContainer3 = document.querySelector('#TextContainer3');
const ScrollerText3 = document.querySelector('#ScrollerText3');

const firstScrollItem = document.querySelector('#firstScrollItem');
const secondScrollItem = document.querySelector('#SecondScrollItem')

document.body.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
});

function MoveText(TextContainerIndex, ScrollerTextIndex){
    TextContainerIndex.addEventListener("mousemove", (event) => {
        const containerLeft = TextContainerIndex.getBoundingClientRect().left;  // Абсолютная координата левого края элемента
        const containerRight = TextContainerIndex.getBoundingClientRect().right;  // Абсолютная координата правого края элемента
        const containerWidth = containerRight - containerLeft;  // Рассчитываем ширину элемента
        const cursorXPosition = event.clientX;  // Положение курсора относительно окна
        
        TextContainerIndex.onmouseleave = () => {
            const threshold = containerLeft + (containerWidth * 0.6);  // 60% от абсолютной длины элемента
            
            if(cursorXPosition > threshold){  // Если курсор находится дальше 60% абсолютной длины элемента
                ScrollerTextIndex.style.left = `0%`;  // Ставим элемент на начальную позицию
            } else {
                ScrollerTextIndex.style.left = `-${100}%`;  // Смещаем элемент влево на 115%
            }
        };
    });
}

MoveText(TextContainer2, ScrollerText2);
MoveText(TextContainer1, ScrollerText1);

firstScrollItem.onclick = () => {
    window.open('https://igyel.github.io/MacaroonShop/', '_blank');
};
secondScrollItem.onclick = () => {
    window.open('https://igyel.github.io/Customs--Final-FE-Project-/', '_blank');
};

const SloganCz = document.querySelector('#SloganCz');
const SloganContainer = document.querySelector('.SloganContainer');

function moveCursor() {
    // Update cursor positions with delay
    cursorX += (targetX - cursorX) * delay;
    cursorY += (targetY - cursorY) * delay;

    // Get screen dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Convert pixels to vw and vh
    const cursorXvw = (cursorX / screenWidth) * 100;
    const cursorYvh = (cursorY / screenHeight) * 100;

    // Set offset for the cursor (as a percentage of screen width and height)
    const offsetXvw = (30 / screenWidth) * 100; // Offset on X in vw
    const offsetYvh = (30 / screenHeight) * 100; // Offset on Y in vh

    // Set cursor positions with offset in vw and vh
    Cursor.style.left = `calc(${cursorXvw}vw - ${offsetXvw}vw)`;
    Cursor.style.top = `calc(${cursorYvh}vh - ${offsetYvh}vh)`;
    
    requestAnimationFrame(moveCursor);
}

moveCursor();

const EmailContainer = document.querySelector('.EmailContainer');
const header = document.querySelector('#header');

function ChangeCursor(Element, changeTo) {
    Element.onmouseover = () => {
        Cursor.style.transform = `scale(${changeTo})`;
    };
    Element.onmouseleave = () => {
        Cursor.style.transform = `scale(1)`;
    };
}

const cursorHint = document.querySelector('#cursorHint');

function MakeAButton(classname, changeTo) {
    let elements = document.querySelectorAll(classname);

    if(classname === ".horizontalScroller__item"){
        elements.forEach(element => {
            element.onmouseover = () => {
                Cursor.style.transform = `scale(${changeTo})`;
                cursorHint.style.opacity = "1";
            };
            element.onmouseleave = () => {
                Cursor.style.transform = `scale(1)`;
                cursorHint.style.opacity = "0";
            };
        });
    } else{
        elements.forEach(element => {
            ChangeCursor(element, changeTo);
        });
    }
}

ChangeCursor(EmailContainer, 0.2);
ChangeCursor(header, 1.25);

MakeAButton("#darkMode", 0.6);
MakeAButton(".Social", 0.5);
MakeAButton(".horizontalScroller__item", 1.3);
MakeAButton(".AboutTextCard", 1.6);
MakeAButton(".SVGContainer", 1.5);
MakeAButton(".Credits", 0.8);
MakeAButton(".SocialContact", 0.7);
MakeAButton("#SloganEng", 1);

const CursorContainer = document.querySelector('.CursorContainer');
let hoveredEmail = false;

function generateTail() {
    if (hoveredEmail) {
        return;
    }

    // Create a new tail element
    let TailElement = document.createElement('div');
    TailElement.classList.add('Tail');

    // Get cursor dimensions
    const cursorRect = Cursor.getBoundingClientRect();
    const cursorWidth = cursorRect.width;
    const cursorHeight = cursorRect.height;

    // Set tail element size slightly smaller than cursor
    TailElement.style.width = `${cursorWidth * 0.9}px`; // Tail size slightly smaller than cursor
    TailElement.style.height = `${cursorHeight * 0.9}px`;

    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const rect = Cursor.getBoundingClientRect();

    const topInVH = (rect.top / windowHeight) * 100;
    const leftInVW = (rect.left / windowWidth) * 100;

    TailElement.style.top = `${topInVH + 3}vh`;
    TailElement.style.left = `${leftInVW + 1}vw`;

    CursorContainer.appendChild(TailElement);

    // Remove the tail element after 100 milliseconds
    setTimeout(() => {
        TailElement.remove();
    }, 100);
}

// Start tail generation
setInterval(() => {
    generateTail();
}, 10);

function TurnOffTail(ClassElement) {
    let Element = document.querySelector(ClassElement);

    Element.addEventListener('mouseenter', () => {
        hoveredEmail = true;
    });
    Element.addEventListener('mouseleave', () => {
        hoveredEmail = false;
    });
}

TurnOffTail('#darkMode');
TurnOffTail('.Social');
TurnOffTail('.Credits');
TurnOffTail('.EmailContainer');
TurnOffTail('.SocialContact');

const SloganUnderlined = document.querySelector('#SloganUnderlined');

SloganUnderlined.onmouseover = () =>{
    SloganUnderlined.classList.add('Lined');
}
SloganUnderlined.onmouseleave = () =>{
    SloganUnderlined.classList.remove('Lined');
}