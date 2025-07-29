let startTime = null;
let elapsedTime = 0;
let interval = null;
let isRunning = false;

function updateDisplay(time) {
  const display = document.getElementById("display");
  const ms = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  display.textContent = 
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(ms).padStart(3, '0')}`;
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
    isRunning = true;
  }
}

function pauseResume() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
  } else {
    startStop();
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  startTime = null;
  elapsedTime = 0;
  updateDisplay(0);
  document.getElementById("laps").innerHTML = "";
}

function recordLap() {
  if (!isRunning) return;
  const lapList = document.getElementById("laps");
  const li = document.createElement("li");
  li.textContent = document.getElementById("display").textContent;
  lapList.appendChild(li);
}
