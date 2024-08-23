document.addEventListener("DOMContentLoaded", () => {
  let timer;
  let seconds = 0;
  let isRunning = false;
  let targetTime = Infinity; 

  const watchSec = document.getElementById("watch-sec");
  const watchMin = document.getElementById("watch-min");
  const watchPlay = document.getElementById("watch-play");
  const watchPause = document.getElementById("watch-pause");
  const watchForward = document.getElementById("watch-forward");
  const watchRewind = document.getElementById("watch-rewind");
  const stopwatchInput = document.getElementById("stopwatch-input");
  const stopwatchTargetTimeText = document.getElementById("stopwatch-target-time-text");

  function updateDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    watchMin.textContent = minutes.toString().padStart(2, "0");
    watchSec.textContent = secs.toString().padStart(2, "0");
  }

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(() => {
        seconds++;
        updateDisplay();
        if (seconds >= targetTime * 60) {
          alert("Target time reached!");
          resetTimer();
        }
      }, 1000);
    }
  }

  function stopTimer() {
    isRunning = false;
    clearInterval(timer);
  }

  function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
  }

  function forwardTime() {
    seconds += 15;
    updateDisplay();
  }

  function rewindTime() {
    seconds = Math.max(0, seconds - 15);
    updateDisplay();
  }

  function setTargetTime() {
    const inputTime = stopwatchInput.value.trim();
    if (inputTime === "") {
      targetTime = Infinity;
      stopwatchTargetTimeText.textContent = "No target";
    } else {
      const [min, sec] = inputTime.split(":").map(num => parseInt(num, 10));
      if (!isNaN(min) && !isNaN(sec)) {
        targetTime = min + (sec / 60);
        const targetMinutes = Math.floor(targetTime);
        const targetSeconds = Math.round((targetTime - targetMinutes) * 60);
        stopwatchTargetTimeText.textContent = `${targetMinutes.toString().padStart(2, "0")}:${targetSeconds.toString().padStart(2, "0")}`;
      } else {
        alert("Invalid time format. Use MM:SS.");
      }
    }
  }

  watchPlay.addEventListener("click", startTimer);
  watchPause.addEventListener("click", stopTimer);
  watchForward.addEventListener("click", forwardTime);
  watchRewind.addEventListener("click", rewindTime);
  stopwatchInput.addEventListener("change", setTargetTime);
});
