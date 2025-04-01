// Test mode flag: set to true for rapid testing (25 seconds, 5 seconds per stage).
const testMode = true;
const pomodoroSeconds = testMode ? 25 : 25 * 60;
const stageDuration = testMode ? 5 : 300;  // Each stage lasts 5 seconds in test mode, 300 seconds normally

let currentTime = pomodoroSeconds;
let intervalId;
let currentStage = 1;

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const timerDisplay = document.getElementById("timer");
const potImage = document.getElementById("pot-image");

startButton.addEventListener("click", () => {
  // Clear any existing interval and reset values
  if (intervalId) {
    clearInterval(intervalId);
  }
  currentTime = pomodoroSeconds;
  currentStage = 1;
  potImage.src = `assets/pot${currentStage}.png`;
  updateTimerDisplay();

  // Start the timer interval
  intervalId = setInterval(() => {
    currentTime--;
    updateTimerDisplay();

    // Calculate the stage based on elapsed time
    const newStage = Math.min(5, Math.floor((pomodoroSeconds - currentTime) / stageDuration) + 1);
    if (newStage !== currentStage) {
      currentStage = newStage;
      potImage.src = `assets/pot${currentStage}.png`;
    }
    
    // End the session when the timer reaches 0
    if (currentTime <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
});

// Stop button: clears the timer interval
stopButton.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
});

function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
