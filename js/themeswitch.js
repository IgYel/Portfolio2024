const moonPath = "M52.9818 46.9819C45.7876 57.4508 31.4688 60.1056 20.9999 52.9114C23.126 52.9413 35.0947 50.1028 42.2888 39.6338C49.483 29.1649 47.8424 16.9741 47.0522 15C57.5212 22.1942 60.1759 36.5129 52.9818 46.9819Z";
const sunPath = "M41.25 29.5C41.25 35.9893 35.9893 41.25 29.5 41.25C23.0107 41.25 17.75 35.9893 17.75 29.5C17.75 23.0107 23.0107 17.75 29.5 17.75C35.9893 17.75 41.25 23.0107 41.25 29.5Z";
const darkModeButton = document.getElementById("darkMode");

let isDarkMode = localStorage.getItem("theme") === "dark";

function setInitialTheme() {
    // Добавляем класс темы в body
    document.body.classList.add(isDarkMode ? "dark" : "light");
    // Устанавливаем цвет обводки для элементов
    setPathStrokeColors(isDarkMode ? "#eaeaeb" : "#1a1a1a");
}

function setPathStrokeColors(color) {
    // Устанавливаем цвет обводки для всех элементов
    document.querySelectorAll(".Text path, .ContactsLogoText path, .ButtonToStart path").forEach(path => {
        path.setAttribute('stroke', color);
    });
}

setInitialTheme();

darkModeButton.addEventListener('click', () => {
    const timeline = anime.timeline({
        duration: 600,
        easing: "easeOutExpo"
    });

    const newTheme = isDarkMode ? "light" : "dark";
    const fillColor = isDarkMode ? "#1a1a1a" : "#eaeaeb";
    const strokeColor = isDarkMode ? "#1a1a1a" : "#eaeaeb";
    const sunColor = isDarkMode ? "#eaeaeb" : "#1a1a1a";
    const newPath = isDarkMode ? sunPath : moonPath;

    timeline
        .add({
            targets: ".sun",
            d: [{ value: newPath }],
            fill: sunColor
        })
        .add({
            targets: ".ray",
            height: isDarkMode ? "10" : "0"
        }, 0)
        .add({
            targets: ".BackofIcon",
            fill: fillColor
        }, 0)
        .add({
            targets: ".Text path, .ContactsLogoText path, .ButtonToStart path",
            stroke: strokeColor,
        }, 0);

    document.body.classList.toggle("dark", !isDarkMode);
    document.body.classList.toggle("light", isDarkMode);

    localStorage.setItem("theme", newTheme);
    isDarkMode = !isDarkMode;
});
