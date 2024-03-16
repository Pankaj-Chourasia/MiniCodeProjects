let timer;
let minutes = 25;
let seconds = 0;
let isTimerRunning = false;
let pausedTime = null;

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');
const interval25Radio = document.getElementById('interval-25');
const interval50Radio = document.getElementById('interval-50');


function startTimer() {
    if (!isTimerRunning) {
        if (interval50Radio.checked) {
            minutes = 50;
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

function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timer);

    pausedTime = {
        minutes: minutes,
        seconds: seconds
    };
}

function resetTimer() {
    isTimerRunning = false;
    clearInterval(timer);
    
    if (interval50Radio.checked) {
        minutes = 50;
    } else {
        minutes = 25;
    }
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

function setTimerDuration() {
    if(interval50Radio.checked){
        minutes = 50;
    }else {
        minutes = 25;
    }

    seconds = 0;
    updateTimerDisplay();
}

function padTime(time) {
    return (time < 10 ? '0' : '') + time;
}

interval25Radio.addEventListener('change', setTimerDuration);
interval50Radio.addEventListener('change', setTimerDuration);


setTimerDuration();

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
