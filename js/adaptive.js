function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

if (isTouchDevice()) {
    const AboutEndLine = document.querySelector(".AboutEndLine");
    const EndLineContact = document.querySelector(".EndLineContact");
    
    const blank = document.createElement("div");
    AboutEndLine.replaceWith(blank); // Временно заменяем элемент1 на временный элемент
    EndLineContact.replaceWith(AboutEndLine);

    const hScroll = document.querySelector('.horizontalScroller');
    const mobileScroll = document.querySelector('.mobileHScroll');
    mobileScroll.innerHTML = "";
    mobileScroll.innerHTML = hScroll.innerHTML;
    mobileScroll.classList.add('horizontalScroller');

    hScroll.innerHTML = "";
    hScroll.classList.remove('horizontalScroller');

} else {
}