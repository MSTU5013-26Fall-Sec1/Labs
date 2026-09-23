// Find all three switch buttons and the room status message.
const switchButtons = document.querySelectorAll(".switch-button");
const roomStatus = document.querySelector("#room-status");

// Run this function whenever a switch button is clicked.
function toggleLight(event) {
    const button = event.target;
    const lightCard = button.closest(".light-card");

    // Turn the selected light on or off.
    lightCard.classList.toggle("is-on");

    const lightIsOn = lightCard.classList.contains("is-on");
    button.textContent = lightIsOn ? "Turn off" : "Turn on";
    button.setAttribute("aria-pressed", lightIsOn);

    updateRoom();
}

// Brighten the room when one or more lights are on.
function updateRoom() {
    const lightsOn = document.querySelectorAll(".light-card.is-on").length;

    document.body.classList.toggle("lights-on", lightsOn > 0);

    if (lightsOn === 0) {
        roomStatus.textContent = "The room is dark. All lights are off.";
    } else if (lightsOn === 1) {
        roomStatus.textContent = "The room is bright. 1 light is on.";
    } else {
        roomStatus.textContent = `The room is bright. ${lightsOn} lights are on.`;
    }
}

// Give every switch button the same click behavior.
switchButtons.forEach(function (button) {
    button.addEventListener("click", toggleLight);
});
