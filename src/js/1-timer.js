import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      
      validateSelectedDate();
    },
  };

flatpickr('input#datetime-picker', options);

startButton.disabled = true;

  function validateSelectedDate() {
    const curentDate = new Date();

    if(userSelectedDate <= curentDate) {
        startButton.disabled = true;
        iziToast.show({
            message: "❌ Please choose a date in the future",
            position: 'topRight',
            backgroundColor: '#D82C20',
            messageColor: '#ffffff',
            close: false
        }); 
    } else {
        startButton.disabled = false;
    }
  }

  function startTimer () {
    const countdownInterwal = setInterval(() => {
        const now = new Date();
        const timeDifference = userSelectedDate - now;

        if(timeDifference <= 0) {
            clearInterval(countdownInterwal);
            updateTimerDisplay(0, 0, 0, 0);

        } else {
            const { days, hours, minutes, seconds } = convertMs(timeDifference);
            updateTimerDisplay(days, hours, minutes, seconds);

            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
              clearInterval(countdownInterwal);
              startButton.disabled = true; 
          }
        }
    }, 1000);
  }

   startButton.addEventListener("click", startTimer);

  function updateTimerDisplay(days, hours, minutes, seconds) {
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
    }

  function addLeadingZero(value) {
  return String(value).padStart(2, "0");
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
  




