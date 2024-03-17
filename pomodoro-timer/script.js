let timer;
let minutes = 25;
let seconds = 0;
let isTimerRunning = false;
let pausedTime = null;
let customTimeSelected = false;

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');
const interval25Radio = document.getElementById('interval-25');
const interval50Radio = document.getElementById('interval-50');
const customMinutesInput = document.getElementById('custom-minutes');
const customSecondsInput = document.getElementById('custom-seconds');
const setCustomTimeBtn = document.getElementById('set-custom-time-btn');
const alarmSound = document.getElementById('alarm-sound');


//function to start the timer
function startTimer() {
    if (!isTimerRunning) {
        if (interval50Radio.checked) {
            minutes = 50;
        } else if (customTimeSelected) {
            minutes = parseInt(customMinutesInput.value) || 0;
            seconds = parseInt(customSecondsInput.value) || 0;
        } else {
            minutes = 25;
        }
        
        // If timer was paused, resume countdown from stored time
        if (pausedTime) {
            minutes = pausedTime.minutes;
            seconds = pausedTime.seconds;
            pausedTime = null; 
        }

        isTimerRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

//function for pausing the timer
function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timer);

    pausedTime = {
        minutes: minutes,
        seconds: seconds
    };
}

// function for resetting the timer
function resetTimer() {
    isTimerRunning = false;
    clearInterval(timer);
    
    if (customTimeSelected) {
        minutes = parseInt(customMinutesInput.value) || 0;
        seconds = parseInt(customSecondsInput.value) || 0;
    } else if (interval50Radio.checked) {
        minutes = 50;
        seconds = 0;
    } else {
        minutes = 25;
        seconds = 0;
    }
    updateTimerDisplay();
}

//updating the timer
function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            // Timer has reached 0, stop the timer
            pauseTimer();
            alarmSound.play();
            alert('Pomodoro session completed!');
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateTimerDisplay();
}


//updating the timer display
function updateTimerDisplay() {
    timerMinutes.textContent = padTime(minutes);
    timerSeconds.textContent = padTime(seconds);
}

function setTimerDuration() {
    if (interval50Radio.checked) {
        minutes = 50;
    } else {
        minutes = 25;
    }
    seconds = 0;
    updateTimerDisplay();
}

// Function to set custom timer duration
function setCustomTime() {
    let customMinutes = parseInt(customMinutesInput.value) || 0;
    let customSeconds = parseInt(customSecondsInput.value) || 0;

    if (customMinutes < 0 || customSeconds < 0 || (customMinutes === 0 && customSeconds === 0)) {
        alert('Please enter a valid time.');
        return;
    }

    customTimeSelected = true;
    minutes = customMinutes;
    seconds = customSeconds;
    updateTimerDisplay(); 
}

function padTime(time) {
    return (time < 10 ? '0' : '') + time;
}

interval25Radio.addEventListener('change', setTimerDuration);
interval50Radio.addEventListener('change', setTimerDuration);


setCustomTimeBtn.addEventListener('click', setCustomTime);

startBtn.addEventListener('click', () => {
    if (!isTimerRunning) {
        startTimer();
    }
});

pauseBtn.addEventListener('click', () => {
    if (isTimerRunning) {
        pauseTimer();
    }
});

resetBtn.addEventListener('click', () => {
    resetTimer();
});

setTimerDuration();
updateTimerDisplay();
