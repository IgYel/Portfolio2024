const pxToVw = (px) => (px / window.innerWidth) * 100;

function isTouchDevice() {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}

function makeGalleryScroll (containerName, swipeContainerClass, itemsClass){
    let i = 0;

    const slide = (direction, elementName, margin, maxMarging) =>{
        if(direction == 'forward'){
            if(margin > (maxMarging)){
                elementName.style.marginLeft = `${margin - 100}vw`;
                i++;
            }
        } else if (direction == 'back') {
            if(margin < 0){
                elementName.style.marginLeft = `${margin + 100}vw`;
                i = i-1;
            }
        }
    }
    const item = document.querySelector(containerName);
    let startX = 0;
    let currentX = 0;
    let differenceX = 0;
    let differenceVw = 0;
    
    // Начало касания
    item.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        startX = touch.clientX;
    });
    
    // Движение пальца
    item.addEventListener('touchmove', (event) => {
        // Обновляем текущие координаты по X
        const touch = event.touches[0];
        currentX = touch.clientX;
        
        // Вычисляем разницу в положении
        differenceX = currentX - startX;
        differenceVw = pxToVw(differenceX);
        const rotation = differenceVw / 5;
        
        const scrollItems = document.querySelectorAll(itemsClass);
        scrollItems.forEach(item =>{
            item.style.transform = `rotateY(${-rotation}deg)`;
        });
    });
    
    // Завершение касания
    item.addEventListener('touchend', () => {
        const scrollItems = document.querySelectorAll(itemsClass);
        scrollItems.forEach(item =>{
            item.style.transform = `rotateY(0deg)`;
        });
        const element = document.querySelector(swipeContainerClass);
        
        // Получаем значение margin-left
        const style = window.getComputedStyle(element);
        
        let currentMarg = Math.round(pxToVw(parseFloat(style.marginLeft)));
        const maxMargingPortfolio = - (100 * (document.querySelectorAll(itemsClass).length - 1));

        if(differenceVw >= 20){
            slide('back', element, currentMarg, maxMargingPortfolio);
            console.log(i);
        }else if(differenceVw <= -20){
            slide('forward', element, currentMarg, maxMargingPortfolio);
            console.log(i);
        }
        
        startX = 0;
        currentX = 0;
        differenceVw = 0;
    });
}

const wrapElements = (containerName) => {
    const container = document.querySelector(containerName);
    // Создаем новый DocumentFragment для новой структуры
    const fragment = document.createDocumentFragment();
    
    // Проходим по всем дочерним элементам контейнера
    Array.from(container.children).forEach(child => {
        // Создаем новый div.wrapper и помещаем в него элемент
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.appendChild(child);
        
        // Добавляем обернутый элемент в DocumentFragment
        fragment.appendChild(wrapper);
    });
    
    container.innerHTML = ''; // очищаем контейнер
    container.appendChild(fragment); // добавляем обернутые элементы
};
if (isTouchDevice()) {
    wrapElements('.horizontalScroller__images');
}

makeGalleryScroll('.horizontalScroller', '.horizontalScroller__images', '.horizontalScroller__item');
makeGalleryScroll('.ContactGallery', '.ContactGallery', '.galleryImage');

// TRANSLATION SECTION
// TRANSLATION SECTION
let number = 0;

const switchLanguageElement = (elementID) => {
    number++;
    const elementContainer = document.querySelector(elementID);
    const textScroll = elementContainer.querySelector('.ScrollerText');

    // create div
    const switchElement = document.createElement('div');
    switchElement.innerHTML = 
    `<div class="switchBody">
        <div class="switchbutton">EN</div>
    </div>`;
    switchElement.classList.add('switchLanguageInScroller');
    switchElement.id = `switch${number}`;
    
    elementContainer.appendChild(switchElement);

    const switchBody = elementContainer.querySelector('.switchLanguageInScroller');
    const switchHead = elementContainer.querySelector('.switchbutton');

    const ENmode = () => {
        textScroll.style.marginLeft = '0';

        switchHead.style.marginLeft = '27.5px';
        switchHead.style.marginRight = '';
        switchHead.textContent = 'EN';
    };

    const CZmode = () => {
        textScroll.style.marginLeft = '-100%';

        switchHead.style.marginRight = '32.5px';
        switchHead.style.marginLeft = '';
        switchHead.textContent = 'CZ';
    };

    switchBody.addEventListener('click', () => {
        if (switchHead.textContent === 'EN') {
            CZmode();
        } else {
            ENmode();
        }
    });
    ENmode();
};

switchLanguageElement('#firstScrollItem');
switchLanguageElement('#SecondScrollItem');