// 1. STATE: each Boolean variable stores whether a light is on.
let light1On = false;
let light2On = false;
let light3On = false;

// 2. ELEMENTS: find the HTML elements we want to update.
const bulb1 = document.getElementById("bulb-1");
const bulb2 = document.getElementById("bulb-2");
const bulb3 = document.getElementById("bulb-3");
const switch1 = document.getElementById("switch-1");
const switch2 = document.getElementById("switch-2");
const switch3 = document.getElementById("switch-3");
const houseSwitch = document.getElementById("house-switch");
const roomSummary = document.getElementById("room-summary");

// 3. RENDER: show one light's state using its shape and switch label.
// Parameters let us reuse this function for all three lights.
function renderLight(bulb, lightSwitch, isOn) {
  if (isOn) {
    bulb.classList.add("is-on");
    lightSwitch.textContent = "On";
  } else {
    bulb.classList.remove("is-on");
    lightSwitch.textContent = "Off";
  }

  // Let screen readers know the state of both buttons.
  bulb.setAttribute("aria-pressed", isOn);
  lightSwitch.setAttribute("aria-pressed", isOn);
}

// A change to any light also updates these related elements.
function renderRoom() {
  renderLight(bulb1, switch1, light1On);
  renderLight(bulb2, switch2, light2On);
  renderLight(bulb3, switch3, light3On);

  let lightsOn = 0;
  if (light1On) {
    lightsOn = lightsOn + 1;
  }
  if (light2On) {
    lightsOn = lightsOn + 1;
  }
  if (light3On) {
    lightsOn = lightsOn + 1;
  }

  let roomState = "Some lights are on.";
  if (lightsOn === 0) {
    roomState = "All lights are off.";
  }
  if (lightsOn === 3) {
    roomState = "All lights are on.";
    houseSwitch.textContent = "Turn all off";
  } else {
    houseSwitch.textContent = "Turn all on";
  }

  roomSummary.textContent = lightsOn + " of 3 lights are on. " + roomState;
}

// 4. ACTIONS: change the stored state, then render the room again.
function toggleLight1() {
  light1On = !light1On; // ! changes true to false, or false to true.
  renderRoom();
}

function toggleLight2() {
  light2On = !light2On;
  renderRoom();
}

function toggleLight3() {
  light3On = !light3On;
  renderRoom();
}

function toggleHouse() {
  // && means AND: all three values must be true.
  if (light1On && light2On && light3On) {
    light1On = false;
    light2On = false;
    light3On = false;
  } else {
    light1On = true;
    light2On = true;
    light3On = true;
  }
  renderRoom();
}

// 5. EVENTS: clicking a bulb or its switch runs the same function.
bulb1.addEventListener("click", toggleLight1);
switch1.addEventListener("click", toggleLight1);
bulb2.addEventListener("click", toggleLight2);
switch2.addEventListener("click", toggleLight2);
bulb3.addEventListener("click", toggleLight3);
switch3.addEventListener("click", toggleLight3);
houseSwitch.addEventListener("click", toggleHouse);

// Render the initial state when the page loads.
renderRoom();
