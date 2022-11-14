import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

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
  const stringValue = String(value);
  return stringValue.padStart(2, '0');
}

btn.addEventListener("click", () => {
    timerId = setInterval(() => {
        let countdown = new Date(text.value) - new Date();
        let timeObject = convertMs(countdown);
        days.textContent = addLeadingZero(timeObject.days);
        hours.textContent = addLeadingZero(timeObject.hours);
        minutes.textContent = addLeadingZero(timeObject.minutes);
        seconds.textContent = addLeadingZero(timeObject.seconds);
    }, 1000);
});
