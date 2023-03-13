// Підключаємо календар
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Підключаємо повідомлення
import {Notify} from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    start: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

// id таймера
let timerId = null;

// Налаштування календаря
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const dateSelected = selectedDates[0];
        let dateNow = new Date(); 
        if (dateSelected <= dateNow) {
            // alert("Please choose a date in the future");
            Notify.failure("Please choose a date in the future");

            // Робимо кнопку Start неактивною
            setStartDisabled(true);
        } else {
            // Робимо кнопку Start активною
            setStartDisabled(false);

            timerId = setInterval(() => {
                // Поточна дата
                const dateNow = new Date(); 

                // Різниця між вибраною і поточною датою
                const diffDates = dateSelected - dateNow;

                // Скільки залишилось до вибраної дати
                const remainder = convertMs(diffDates);

                // Виводимо залишок часу
                refs.days.textContent = addLeadingZero(remainder.days);
                refs.hours.textContent = addLeadingZero(remainder.hours);
                refs.minutes.textContent = addLeadingZero(remainder.minutes);
                refs.seconds.textContent = addLeadingZero(remainder.seconds);

                // Якщо час скінчився, то зупиняємо таймер
                if (remainder.days === 0 && remainder.hours === 0 && remainder.minutes === 0 && remainder.seconds === 0) {
                    clearInterval(timerId);
                }
            }, 1000);
        }
    },
};

// Додаємо прослуховувач на подію click кнопки Start
refs.start.addEventListener('click', onStartClick);

// Ініціалізація календаря
flatpickr('#datetime-picker', options);

// Робимо кнопку Start спочатку неактивною
setStartDisabled(true);

// Функція обробки кліку по кнопці Start
function onStartClick() {

}

// Функція, що робить кнопку Start активною чи не активною
function setStartDisabled(disabled) {
    refs.start.disabled = disabled;
}
// функція форматування часу
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
  
// Функція додавання незначащих нулів для одноцифрових чисел
function addLeadingZero(value) {
    return String(value).padStart(2,'0');
}
