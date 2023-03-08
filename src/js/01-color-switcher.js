const refs = {
    body: document.querySelector('body'),
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
} 

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);
let timerId = null;

// Функція обробки кліку по кнопці Start
function onStartClick(e) {
    // Робимо кнопку Start неактивною
    refs.start.disabled = true;

    // Змінюємо колір фону <body> кожну секунду
    changeBodyBG();
}

// Функція обробки кліку по кнопці Stop
function onStopClick(e) {
    // Робимо кнопку Start активною
    refs.start.disabled = false;

    // Зупиняємо зміну кольору фону <body>
    clearInterval(timerId);
}

// Функція зміни кольору фону <body> кожну секунду
function changeBodyBG() {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

// Функція генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
