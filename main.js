let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('laps');
const clearBtn = document.getElementById('clearBtn');

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 1;
    
    display.innerHTML = '00:00:00<span class="milliseconds">.000</span>';
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    
    const milliseconds = Math.floor((elapsedTime % 1000));
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    
    const formattedTime = 
        pad(hours) + ':' + 
        pad(minutes) + ':' + 
        pad(seconds);
    const formattedMs = padMs(milliseconds);
    
    display.innerHTML = formattedTime + '<span class="milliseconds">.' + formattedMs + '</span>';
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function padMs(number) {
    if (number < 10) return '00' + number;
    if (number < 100) return '0' + number;
    return number;
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const noLapsMsg = lapsContainer.querySelector('.no-laps');
        
        if (noLapsMsg) {
            noLapsMsg.remove();
        }
        
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCounter}</span>
            <span class="lap-time">${lapTime}</span>
        `;
        
        lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
        lapCounter++;
        
        clearBtn.style.display = 'block';
    }
}

function clearLaps() {
    lapsContainer.innerHTML = '<div class="no-laps">No laps recorded yet</div>';
    lapCounter = 1;
    clearBtn.style.display = 'none';
}

function formatTime(ms) {
    const milliseconds = Math.floor((ms % 1000));
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + '.' + padMs(milliseconds);
}