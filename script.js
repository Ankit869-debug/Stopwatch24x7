let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 1000);
  startStopButton.textContent = 'Pause';
  isRunning = true;
}

function pause() {
  clearInterval(timerInterval);
  startStopButton.textContent = 'Start';
  isRunning = false;
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00';
  elapsedTime = 0;
  isRunning = false;
  startStopButton.textContent = 'Start';
  lapsContainer.innerHTML = '';
}

function lap() {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.textContent = display.textContent;
  lapsContainer.appendChild(li);
}

startStopButton.addEventListener('click', () => {
  if (isRunning) {
    pause();
  } else {
    start();
  }
});

resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
