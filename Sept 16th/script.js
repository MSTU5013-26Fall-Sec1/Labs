// Day by Day stores data as an object whose keys are dates:
// { "2026-09-16": [{ id, text, completed }] }
const STORAGE_KEY = "day-by-day-checklist";

const dateInput = document.querySelector("#selected-date");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskTemplate = document.querySelector("#task-template");
const taskSummary = document.querySelector("#task-summary");
const emptyState = document.querySelector("#empty-state");
const clearCompletedButton = document.querySelector("#clear-completed");
const formError = document.querySelector("#form-error");

let checklists = loadChecklists();

dateInput.value = getLocalDateString();
renderTasks();

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (!text) {
    formError.textContent = "Please enter a task.";
    taskInput.focus();
    return;
  }

  const tasks = getTasksForSelectedDate();
  tasks.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });

  formError.textContent = "";
  taskInput.value = "";
  saveAndRender(tasks);
  taskInput.focus();
});

dateInput.addEventListener("change", () => {
  formError.textContent = "";
  renderTasks();
});

clearCompletedButton.addEventListener("click", () => {
  const unfinishedTasks = getTasksForSelectedDate().filter(
    (task) => !task.completed,
  );
  saveAndRender(unfinishedTasks);
});

function renderTasks() {
  const tasks = getTasksForSelectedDate();
  taskList.replaceChildren();

  tasks.forEach((task) => {
    const taskElement = taskTemplate.content.firstElementChild.cloneNode(true);
    const checkbox = taskElement.querySelector(".task-checkbox");
    const text = taskElement.querySelector(".task-text");
    const editButton = taskElement.querySelector(".edit-button");
    const deleteButton = taskElement.querySelector(".delete-button");

    text.textContent = task.text;
    checkbox.checked = task.completed;
    taskElement.classList.toggle("completed", task.completed);

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveAndRender(tasks);
    });

    editButton.addEventListener("click", () => editTask(task, tasks));

    deleteButton.addEventListener("click", () => {
      const updatedTasks = tasks.filter((item) => item.id !== task.id);
      saveAndRender(updatedTasks);
    });

    taskList.append(taskElement);
  });

  updateListDetails(tasks);
}

function editTask(task, tasks) {
  const newText = window.prompt("Edit this task:", task.text);

  // Clicking Cancel returns null, so no change should be made.
  if (newText === null) return;

  const trimmedText = newText.trim();
  if (!trimmedText) {
    formError.textContent = "A task cannot be empty.";
    return;
  }

  task.text = trimmedText;
  formError.textContent = "";
  saveAndRender(tasks);
}

function getTasksForSelectedDate() {
  return checklists[dateInput.value] ?? [];
}

function saveAndRender(tasks) {
  if (tasks.length > 0) {
    checklists[dateInput.value] = tasks;
  } else {
    delete checklists[dateInput.value];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(checklists));
  renderTasks();
}

function updateListDetails(tasks) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const taskWord = tasks.length === 1 ? "task" : "tasks";

  taskSummary.textContent = `${completedCount} of ${tasks.length} ${taskWord} completed`;
  emptyState.hidden = tasks.length > 0;
  clearCompletedButton.disabled = completedCount === 0;
}

function loadChecklists() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch (error) {
    console.warn("The saved checklist could not be read.", error);
    return {};
  }
}

function getLocalDateString() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);
}