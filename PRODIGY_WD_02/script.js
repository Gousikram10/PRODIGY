let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (savedTime || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.textContent = 'Pause';
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startStopBtn.textContent = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    lapsContainer.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const milliseconds = Math.floor((difference % 1000) / 10);
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function recordLap() {
    if (running) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        lapsContainer.appendChild(lapItem);
    }
}
