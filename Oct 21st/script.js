// 1. State: three values the app remembers.
let isOn = false;
let isLarge = false;
let isBrewing = false;

// 2. Find the HTML elements we want to change.
const powerStatus = document.getElementById("powerStatus");
const brewStatus = document.getElementById("brewStatus");
const powerButton = document.getElementById("powerButton");
const sizeButton = document.getElementById("sizeButton");
const brewButton = document.getElementById("brewButton");
const cup = document.getElementById("cup");
const coffee = document.getElementById("coffee");

// 3. Each button changes a value, then updates the page.
function togglePower() {
  isOn = !isOn; // ! changes true to false, or false to true.
  isBrewing = false;
  updateDisplay();
}

function changeSize() {
  isLarge = !isLarge;
  updateDisplay();
}

function startStop() {
  isBrewing = !isBrewing;
  updateDisplay();
}

// 4. Show the current state using text, styles, and disabled buttons.
function updateDisplay() {
  if (isOn) {
    powerStatus.textContent = "Power: On";
    powerButton.textContent = "Turn off";
    powerButton.setAttribute("aria-pressed", "true");
    sizeButton.disabled = false;
    brewButton.disabled = false;
  } else {
    powerStatus.textContent = "Power: Off";
    powerButton.textContent = "Turn on";
    powerButton.setAttribute("aria-pressed", "false");
    sizeButton.disabled = true;
    brewButton.disabled = true;
  }

  if (isLarge) {
    cup.style.height = "160px";
    sizeButton.textContent = "Size: Large";
  } else {
    cup.style.height = "100px";
    sizeButton.textContent = "Size: Small";
  }

  if (isBrewing) {
    coffee.style.height = "80%";
    brewButton.textContent = "Stop";
    brewStatus.textContent = "Coffee: Full";
    sizeButton.disabled = true;
  } else {
    coffee.style.height = "0%";
    brewButton.textContent = "Start";
    brewStatus.textContent = "Coffee: Empty";
  }
}

// Draw the starting state when the page loads.
updateDisplay();
