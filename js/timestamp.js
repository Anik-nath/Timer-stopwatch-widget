// Define variables for timer
let timerInterval;
let timerSeconds = 0;
let isRunning = false;

// Get DOM elements
const timerSec = document.getElementById('timer-sec');
const timerMin = document.getElementById('timer-min');
const timerInput = document.getElementById('timer-input');
const playButton = document.getElementById('timer-play');
const pauseButton = document.getElementById('timer-pause');
const rewindButton = document.getElementById('timer-rewind');
const forwardButton = document.getElementById('timer-forward');

// Update the timer display
function updateDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerMin.textContent = minutes.toString().padStart(2, '0');
    timerSec.textContent = seconds.toString().padStart(2, '0');
}

// Start the countdown timer
function startTimer() {
    if (!isRunning) {
        timerInterval = setInterval(() => {
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                alert("Time's up!");
            } else {
                timerSeconds--;
                updateDisplay();
            }
        }, 1000);
        isRunning = true;
    }
}

// Pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Rewind the timer by 15 seconds
function rewindTimer() {
    timerSeconds = Math.max(0, timerSeconds - 15);
    updateDisplay();
}

// Forward the timer by 15 seconds
function forwardTimer() {
    timerSeconds += 15;
    updateDisplay();
}

// Set timer from user input
function setTimer() {
    const [inputMin, inputSec] = timerInput.value.split(':').map(Number);
    if (!isNaN(inputMin) && !isNaN(inputSec)) {
        timerSeconds = inputMin * 60 + inputSec;
        updateDisplay();
    }
}

// Event listeners
playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
rewindButton.addEventListener('click', rewindTimer);
forwardButton.addEventListener('click', forwardTimer);
timerInput.addEventListener('blur', setTimer);

// Initial display update
updateDisplay();
