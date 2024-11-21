let currentMonth = "no";
const xmasHat = document.querySelector('#xmasHat');

const getCurrentMonth = () => {
    const date = new Date();
    const month = date.getMonth() + 1; // getMonth возвращает месяцы от 0 до 11, поэтому добавляем 1
    currentMonth = month;
};
getCurrentMonth();

if(currentMonth == 12 || currentMonth == 1){
    snow.style.display = "block";
    xmasHat.style.display = "block";
}
