import flatpickr from "flatpickr";
import izitoast from "izitoast";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

let countdownInterval;
let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    },
  };

  flatpickr('input[type="text"]', options);

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
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

  const datatimePiker = document.getElementById("datetime-picker");
  const startBtn =  document.querySelector("button[data-start]");

  datatimePiker.addEventListener("change", () => {
    const selectedData = new Data(datatimePiker.value);

    const currentData = new Data();
    if(selectedData < currentData) {
        window.alert('Please choose a date in the future');
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
  });

  startBtn.addEventListener("click", () => {
    let timeDifference = userSelectedDate - new Date();

    countdownInterval = setInterval(() => {
        const timeObject = convertMs(timeDifference);

    document.querySelector("[data-days]").textContent = addLeadingZero(timeObject.days);
    document.querySelector("[data-hours]").textContent = addLeadingZero(timeObject.hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(timeObject.minutes);
    document.querySelector("[data-seconds]").textContent = addLeadingZero(timeObject.seconds);

    if(timeDifference <= 0) {
        clearInterval(countdownInterval);

        izitoast.show({
            title: 'Countdown Completed',
            message: 'The countdown has reached the end date.',
        }); 
         startBtn.disabled = false;
    } else {
        timeDifference -= 1000;
    }
    }, 1000);

  });





