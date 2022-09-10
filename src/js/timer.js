import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  canvas: document.querySelectorAll('#stockGraph'),
  inputEl: document.querySelector('#datetime-picker'),

  audioEl: document.querySelector('.audio'),

  intrfaceEl: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};

const widthField = '150px';
const halfWidthField = Math.floor(widthField / 2);

refs.canvas.forEach(canvas => {
  canvas.setAttribute('width', widthField);
  canvas.setAttribute('height', widthField);
});

let intervalId = null;
console.dir(refs.startBtn);

refs.startBtn.addEventListener('click', onClickBtnStartTime);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      refs.startBtn.disabled = false;
    }
  },
});

function onClickBtnStartTime() {
  refs.inputEl.disabled = true;
  refs.startBtn.disabled = true;

  intervalId = setInterval(() => {
    const selectedTime = new Date(refs.inputEl.value);
    const deltaTime = selectedTime - Date.now();

    if (deltaTime <= 1000) {
      clearInterval(intervalId);
      refs.inputEl.disabled = false;
      refs.startBtn.disabled = false;

      refs.audioEl.play();
      Notify.success('Finish!');
    }
    changeInterface(deltaTime);
  }, 1000);
}

function changeInterface(deltaTime) {
  const data = convertMs(deltaTime);
  Object.entries(data).forEach(([key, value], index) => {
    refs.intrfaceEl[key].textContent = addLeadingZero(value);
    drawCircle(index, value);
  });
}

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
  return value.toString().padStart(2, '0');
}

function drawCircle(index, value) {
  const ctx = refs.canvas[index].getContext('2d');

  ctx.clearRect(0, 0, widthField, widthField);
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(254, 61, 43)';

  ctx.lineWidth = 4;
  // ctx.lineCap = 'round';
  let path = 60 / 2;
  if (index === 1) {
    path = 24 / 2;
  }
  ctx.arc(
    halfWidthField,
    halfWidthField,
    halfWidthField - 2,
    (Math.PI / path) * (value - path / 2),
    (Math.PI / path) * (path * 2 - path / 2 - 0.01),
    true
  );
  ctx.stroke();
}
