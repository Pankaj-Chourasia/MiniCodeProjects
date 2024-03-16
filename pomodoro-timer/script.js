let timer;
let minutes = 25;
let seconds = 0;
let isTimerRunning = false;

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');

function startTimer() {
    isTimerRunning = true;
    timer = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isTimerRunning = false;
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
}

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            // Timer has reached 0, stop the timer
            pauseTimer();
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

function updateTimerDisplay() {
    timerMinutes.textContent = padTime(minutes);
    timerSeconds.textContent = padTime(seconds);
}

function padTime(time) {
    return (time < 10 ? '0' : '') + time;
}

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

updateTimerDisplay();
