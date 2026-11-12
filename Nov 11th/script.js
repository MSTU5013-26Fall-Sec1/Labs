// 1. Select the HTML elements that our functions will use.
const createButton = document.querySelector("#create-button");
const hideButton = document.querySelector("#hide-button");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");
const realTimeContent = document.querySelector("#realTimeContent");

// 2. Define functions. Each function has one main job.
function showCreateForm() {
  taskForm.hidden = false;
  createButton.setAttribute("aria-expanded", "true");
  taskInput.focus();
}

function hideCreateForm() {
  taskForm.hidden = true;
  hideButton.setAttribute("aria-expanded", "true");
  hideButton.focus();
}

// A parameter (content) receives a value; return sends a result back.
function createTaskElement(content) {
  const taskItem = document.createElement("li");
  taskItem.className = "list-group-item";
  // textContent displays input as text, including any HTML characters.
  taskItem.textContent = content;
  return taskItem;
}

function saveTask(event) {
  // Keep the browser from reloading the page when the form submits.
  event.preventDefault();

  const content = taskInput.value.trim();

  // Reject input that contains only spaces.
  if (content === "") {
    taskInput.value = "";
    taskInput.reportValidity();
    return;
  }

  // Call another function and use the element it returns.
  const taskItem = createTaskElement(content);
  taskList.append(taskItem);
  emptyMessage.hidden = true;

  taskForm.reset();
  taskForm.hidden = true;
  createButton.setAttribute("aria-expanded", "false");
  createButton.focus();
  
  realTimeContent.textContent = "";
}
function showRealTimeContent(){
     realTimeContent.textContent = taskInput.value.trim();
}

// 3. Connect events to functions. Pass the function name without ().
// The browser calls each function when its event happens.
createButton.addEventListener("click", showCreateForm);
hideButton.addEventListener("click", hideCreateForm);
// Both Enter in the input and clicking Save trigger this submit event.
taskForm.addEventListener("submit", saveTask);
taskInput.addEventListener("input",showRealTimeContent);
