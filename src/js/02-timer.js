import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const dayValue = document.querySelector('.value[data-days]');
const hourValue = document.querySelector('.value[data-hours]');
const minuteValue = document.querySelector('.value[data-minutes]');
const secondValue = document.querySelector('.value[data-seconds]');

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date) {
            Notiflix.Notify.failure('Please choose a date in the future');
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
  },
};

flatpickr(text, options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

btn.addEventListener("click", () => {
    timerId = setInterval(() => {
        let countdown = new Date(text.value) - new Date();
        let timeObject = convertMs(countdown);
        dayValue.textContent = addLeadingZero(timeObject.days);
        hourValue.textContent = addLeadingZero(timeObject.hours);
        minuteValue.textContent = addLeadingZero(timeObject.minutes);
        secondValue.textContent = addLeadingZero(timeObject.seconds);
    }, 1000);
});
