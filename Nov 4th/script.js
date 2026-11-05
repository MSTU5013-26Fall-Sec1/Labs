// 1. DATA: an array of objects. Each object represents one car.
// const keeps the array variable; Cars.push() can still add objects.
// This demo keeps data in memory. Refreshing restores these three cars.
const Cars = [
  { brand: "Toyota", model: "Corolla", mileage: 24000, color: "Silver", IsOnsale: true, year: 2022, price: 32000 },
  { brand: "Honda", model: "Civic", mileage: 18500, color: "Blue", IsOnsale: false, year: 2023, price: 25000 },
  { brand: "Ford", model: "Mustang", mileage: 32000, color: "Red", IsOnsale: true, year: 2021, price: 40000 }
];

// 2. ELEMENTS: connect JavaScript variables to elements in index.html.
const newCarButton = document.getElementById("newCarButton");
const carForm = document.getElementById("carForm");
const carList = document.getElementById("carList");
const carTemplate = document.getElementById("carTemplate");
const searchInput = document.getElementById("searchInput");
const saleFilter = document.getElementById("saleFilter");
const backToTop = document.getElementById("backToTop");
const modalElement = document.getElementById("carModal");
const carModal = new bootstrap.Modal(modalElement);
const mileageInput = document.getElementById("mileage");
const mileageValue = document.getElementById("mileageValue");
// null means adding a car; a number identifies the car being edited.
let editingIndex = null;

// 3. FUNCTIONS: reusable instructions.
function updateMileageValue() {
  mileageValue.textContent = Number(mileageInput.value).toLocaleString();
}

function editCar(index) {
  editingIndex = index;
  const car = Cars[index];
  document.getElementById("modalTitle").textContent = "Edit car";
  document.getElementById("brand").value = car.brand;
  document.getElementById("model").value = car.model;
  document.getElementById("year").value = car.year;
  document.getElementById("price").value = car.price;
  mileageInput.value = car.mileage;
  document.getElementById("color").value = car.color;
  document.getElementById("isOnsale").checked = car.IsOnsale;
  updateMileageValue();
  carModal.show();
}

function displayCars() {
  // Clear old cards before rebuilding the list from the array.
  carList.replaceChildren();
  const search = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  Cars.forEach(function (car, index) {
    const matchesSearch = (car.brand + " " + car.model).toLowerCase().includes(search);
    const matchesSale = !saleFilter.checked || car.IsOnsale;
    if (!matchesSearch || !matchesSale) {
      return; // Skip this car if it does not match the filters.
    }

    // Copy the HTML template and fill its elements with this car's values.
    // textContent treats user input as text, so it cannot become HTML.
    const card = carTemplate.content.cloneNode(true);
    card.querySelector(".car-brand").textContent = car.brand;
    card.querySelector(".car-year").textContent = car.year;
    card.querySelector(".car-title").textContent = car.brand + " " + car.model;
    card.querySelector(".car-mileage").textContent = car.mileage.toLocaleString() + " mi";
    card.querySelector(".car-color").textContent = car.color;
    card.querySelector(".car-price").textContent = "$" + car.price.toLocaleString();
    const badge = card.querySelector(".car-sale");
    badge.textContent = car.IsOnsale ? "On sale" : "Regular price";
    badge.classList.add(car.IsOnsale ? "text-bg-success" : "text-bg-light");
    // Each button remembers its car's original array index, even when filtered.
    const editButton = card.querySelector(".edit-car");
    editButton.setAttribute("aria-label", "Edit " + car.brand + " " + car.model);
    editButton.addEventListener("click", function () {
      editCar(index);
    });
    carList.appendChild(card);
    visibleCount++;
  });

  document.getElementById("inventoryCount").textContent = visibleCount + " of " + Cars.length + " cars";
  document.getElementById("emptyMessage").hidden = visibleCount > 0;
}

// 4. EVENTS: element.addEventListener("eventName", function () { ... });

// CLICK: clicking New car opens the Bootstrap modal.
newCarButton.addEventListener("click", function () {
  editingIndex = null;
  carForm.reset();
  document.getElementById("modalTitle").textContent = "Add a new car";
  updateMileageValue();
  carModal.show();
});

// Bootstrap emits this event when the modal finishes opening.
modalElement.addEventListener("shown.bs.modal", function () {
  document.getElementById("brand").focus();
});

// SUBMIT: Save car submits the form. Enter can also submit it.
// The browser checks required fields and number limits before this event.
carForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the browser from reloading the page.

  const newCar = {
    brand: document.getElementById("brand").value.trim(),
    model: document.getElementById("model").value.trim(),
    mileage: Number(document.getElementById("mileage").value),
    color: document.getElementById("color").value.trim(),
    IsOnsale: document.getElementById("isOnsale").checked,
    year: Number(document.getElementById("year").value),
    price: Number(document.getElementById("price").value)
  };

  if (editingIndex === null) {
    Cars.push(newCar); // Add a new car.
  } else {
    Cars[editingIndex] = newCar; // Replace the selected car, without adding a copy.
  }
  editingIndex = null;
  searchInput.value = "";
  saleFilter.checked = false; // Show ALL cars after saving, including the new one.
  displayCars();
  carForm.reset();
  carModal.hide();
});

// INPUT: update the mileage label when dragging or using the arrow keys.
mileageInput.addEventListener("input", function () {
  updateMileageValue();
});

// WHEEL: scrolling over a range input emits "wheel", not "scroll".
// Prevent page scrolling while adjusting mileage. stepUp/stepDown respect limits.
mileageInput.addEventListener("wheel", function (event) {
  if (event.ctrlKey || event.deltaY === 0) {
    return; // Leave browser zoom and horizontal-only scrolling alone.
  }
  event.preventDefault();
  if (event.deltaY < 0) {
    mileageInput.stepUp();
  } else {
    mileageInput.stepDown();
  }
  // Changing a value in code does not fire the input event automatically.
  updateMileageValue();
}, { passive: false });

// INPUT: runs on every edit to the search field.
searchInput.addEventListener("input", function () {
  displayCars();
});

// CHANGE: runs when the checkbox is checked or unchecked.
saleFilter.addEventListener("change", function () {
  displayCars();
});

// KEYDOWN: the event object tells us which key was pressed.
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    searchInput.value = "";
    displayCars();
  }
});

// SCROLL: listen on window because the whole page is scrolling.
window.addEventListener("scroll", function () {
  backToTop.hidden = window.scrollY < 150;
});

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "instant" });
});

// 5. START: show the sample cars when the page first loads.
displayCars();
