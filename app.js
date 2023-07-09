// Dom elements
const form = document.querySelector(".form-bg");
const formInput = document.querySelector(".input-field");
const todolist = document.querySelector(".todolist");
const listLength = document.querySelector("#list-length");
const completed = document.querySelector(".clear");
const completedTodos = document.querySelector(".completed");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const todoCheck = document.querySelector("#todo-check");
const allTodos = document.querySelectorAll(".todo");
const para = document.querySelector(".para");
const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
const deleteButton = document.querySelectorAll(".delete");
let todos = JSON.parse(localStorage.getItem("task")) || [];

if (localStorage.getItem("task")) {
  todos.forEach((task) => {
    createTask(task);
  });
}

const formSubmit = () => {
  formInput.addEventListener("submit", (e) => {
    e.preventDefault();
  });
};

formInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    formSubmit();
    let inputValue = formInput.value;
    if (inputValue == "") {
      return;
    }

    const task = {
      id: new Date().getTime(),
      name: inputValue,
      isComplete: false,
    };

    todos.push(task);
    localStorage.setItem("task", JSON.stringify(todos));

    createTask(task);

    form.reset();
  }
});

function createTask(task) {
  const todo = document.createElement("div");
  const taskId = task.id.toString();
  todo.setAttribute("id", taskId);
  if (task.isComplete) {
    todo.classList.add("complete");
  } else {
    todo.classList.add("pending");
  }

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", `todo-check`);
  if (task.isComplete) {
    checkbox.setAttribute("checked", "checked");
    checkbox.classList.add("dark-circle");
  }

  checkbox.addEventListener("change", () => {
    task.isComplete = checkbox.checked;
    localStorage.setItem("task", JSON.stringify(todos));
    countTasks();
  });

  const para = document.createElement("p");
  para.classList.add("para");
  if (!task.isComplete) {
    para.setAttribute("contenteditable", true);
  }
  para.textContent = task.name;

  const deleteButton = document.createElement("img");
  deleteButton.classList.add("delete");
  deleteButton.setAttribute("src", "/images/icon-cross.svg");
  deleteButton.setAttribute("alt", "");

  todo.classList.add("todo");
  todo.appendChild(checkbox);
  todo.appendChild(para);
  todo.appendChild(deleteButton);
  todolist.appendChild(todo);
  countTasks();

  // Apply dark mode to newly created task
  let themeSwitch = document.querySelector(".theme");

  if (themeSwitch.classList.contains("dark-theme")) {
    todo.classList.add("dark-mode-todo");
    checkbox.classList.add("dark-mode");
    para.classList.add("dark-circle");
  } else {
    todo.classList.remove("dark-mode-todo");
    checkbox.classList.remove("dark-mode");
    para.classList.remove("dark-circle");
  }
}

function countTasks() {
  const completedtasksArray = todos.filter((task) => {
    return task.isComplete === true;
  });
  completedTodos.addEventListener("click", () => {
    completedTodos.classList.add("active-filter");
    all.classList.remove("active-filter");
    active.classList.remove("active-filter");
    const completedTasks = todos.filter((task) => task.isComplete);

    // Clear existing tasks from the list
    while (todolist.firstChild) {
      todolist.firstChild.remove();
    }

    // Render only the completed tasks
    completedTasks.forEach((task) => {
      createTask(task);
    });

    // Update the task count
    countTasks();
  });

  all.addEventListener("click", () => {
    completedTodos.classList.remove("active-filter");
    all.classList.add("active-filter");
    active.classList.remove("active-filter");
    while (todolist.firstChild) {
      todolist.firstChild.remove();
    }

    todos.forEach((task) => {
      createTask(task);
    });
  });

  active.addEventListener("click", () => {
    completedTodos.classList.remove("active-filter");
    all.classList.remove("active-filter");
    active.classList.add("active-filter");
    const activeTasksArray = todos.filter((task) => {
      return task.isComplete === false;
    });

    const activeTasks = todos.filter((task) => !task.isComplete);

    while (todolist.firstChild) {
      todolist.firstChild.remove();
    }

    activeTasks.forEach((task) => {
      createTask(task);
    });
  });

  let totalTasks = todos.length - completedtasksArray.length;
  listLength.innerText = `${totalTasks} items left`;
}

document.addEventListener("DOMContentLoaded", function () {
  let themeSwitch = document.querySelector(".theme");

  themeSwitch.addEventListener("click", function () {
    let allTodos = document.querySelectorAll(".todo");
    let allparas = document.querySelectorAll(".para");
    let allfilterparas = document.querySelectorAll(".filterpara");
    let allCheckboxes = document.querySelectorAll("input[type='checkbox']");
    let newTodos = document.querySelectorAll(".new-todo");

    // Toggle theme classes
    themeSwitch.classList.toggle("dark-theme");
    document.querySelector(".body").classList.toggle("darkbg");
    document.querySelector(".form-bg").classList.toggle("dark-mode");
    document.querySelector(".input-field").classList.toggle("dark-mode");
    document.querySelector(".circle-top").classList.toggle("dark-mode");
    document.querySelector("#todo-list").classList.toggle("dark-mode");
    document.querySelector("footer").classList.toggle("dark-mode2");
    document.querySelector(".filters").classList.toggle("dark-mode");
    document.querySelector("#list-length").classList.toggle("dark-circle2");
    document.querySelector(".clear").classList.toggle("dark-circle2");
    allfilterparas.forEach((fp) => {
      fp.classList.toggle("dark-circle2");
    });
    allTodos.forEach((todo) => {
      todo.classList.toggle("dark-mode-todo");
    });
    allparas.forEach((para) => {
      para.classList.toggle("dark-circle");
    });
    allCheckboxes.forEach((checkbox) => {
      checkbox.classList.toggle("dark-mode");
    });

    // Apply dark mode to newly fetched items based on the current theme
    if (themeSwitch.classList.contains("dark-theme")) {
      newTodos.forEach((newTodo) => {
        newTodo.classList.add("dark-mode-todo");
        newTodo
          .querySelector("input[type='checkbox']")
          .classList.add("dark-mode");
        newTodo.querySelector(".para").classList.add("dark-circle");
      });
    } else {
      newTodos.forEach((newTodo) => {
        newTodo.classList.remove("dark-mode-todo");
        newTodo
          .querySelector("input[type='checkbox']")
          .classList.remove("dark-mode");
        newTodo.querySelector(".para").classList.remove("dark-circle");
      });
    }
  });
});

// ...

// Attach click listener to the parent container of todo list items
todolist.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const todo = e.target.parentElement;
    const taskId = todo.getAttribute("id");
    const taskIdNum = parseInt(taskId);

    // Remove task from todos array
    todos = todos.filter((item) => item.id !== taskIdNum);

    // Remove task from local storage
    localStorage.setItem("task", JSON.stringify(todos));

    // Remove task from todo list
    todo.remove();

    countTasks();
  }
});

// ...

completed.addEventListener("click", () => {
  // Select all completed tasks
  const completedTasks = document.querySelectorAll(".complete");

  // Remove completed tasks from the todos array and the todo list
  completedTasks.forEach((task) => {
    const taskId = task.getAttribute("id");
    const taskIdNum = parseInt(taskId);

    // Remove task from todos array
    todos = todos.filter((item) => item.id !== taskIdNum);

    // Remove task from local storage
    localStorage.setItem("task", JSON.stringify(todos));

    // Remove task from todo list
    task.remove();
  });

  countTasks();
});

