// Select DOM elements
const form = document.querySelector(".form-bg");
const header = document.querySelector("header");
const section = document.querySelector("#form")
const formInput = document.querySelector(".input-field");
const todolist = document.querySelector(".todolist");
const listLength = document.querySelector("#list-length");
const completed = document.querySelector(".clear");
const completedTodos = document.querySelector(".completed");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const footer = document.querySelector("footer")

/* fetching tasks from localStorage and saving them in todos
 as an array if no tasks present todos array is set to empty*/

let todos = JSON.parse(localStorage.getItem("task")) || [];

// Check if there are tasks in local storage and render them
if (localStorage.getItem("task")) {
  todos.forEach((task) => {
    createTask(task);
  });
}

// Prevent form submission
const formSubmit = () => {
  formInput.addEventListener("submit", (e) => {
    e.preventDefault();
  });
};

// Event listener for form submission using Enter key
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

    // Add task to todos array and update local storage
    todos.push(task);
    localStorage.setItem("task", JSON.stringify(todos));

    // Create and render the new task
    createTask(task);
    form.reset();
  }
});

// Function to create and render a task
function createTask(task) {
  const todo = document.createElement("div");
  const taskId = task.id.toString();
  todo.setAttribute("id", taskId);

  // Set appropriate class based on task completion status
  if (task.isComplete) {
    todo.classList.add("complete");
  } else {
    todo.classList.add("pending");
  }

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", `todo-check`);

  // Set checkbox state and class based on task completion status
  if (task.isComplete) {
    checkbox.setAttribute("checked", "checked");
    checkbox.classList.add("dark-circle");
  }

  checkbox.addEventListener("change", () => {
    // Update task completion status
    task.isComplete = checkbox.checked;

    // Update todos array and local storage
    updateTask(task);

    // Update task count and filters
    countTasks();
  });

  const para = document.createElement("p");
  para.classList.add("para");

  // Make task name editable if it is not complete
  if (!task.isComplete) {
    para.addEventListener("dblclick" , ()=>{
      para.setAttribute("contenteditable", true);
    })
    
 // Event listener to save the edited task name
    para.addEventListener("input", () => {
      task.name = para.textContent.trim();
      updateTask(task); // Update task name
    });
  }
  para.textContent = task.name;

  const deleteButton = document.createElement("img");
  deleteButton.classList.add("delete");
  deleteButton.setAttribute("src", "/images/icon-cross.svg");
  deleteButton.setAttribute("alt", "");

  // Append elements to todo div
  todo.classList.add("todo");
  todo.appendChild(checkbox);
  todo.appendChild(para);
  todo.appendChild(deleteButton);
  todolist.appendChild(todo);
  todolist.classList.add("animate__animated")
  todolist.classList.add("animate__bounceIn")
  countTasks();
  todo.classList.add("animate__animated")
  todo.classList.add("animate__bounceIn")
  footer.classList.add("animate__animated")
  footer.classList.add("animate__bounceIn")
  header.classList.add("animate__animated")
  header.classList.add("animate__bounceIn")
  section.classList.add("animate__animated")
  section.classList.add("animate__bounceIn")


  // Apply dark mode to newly created task based on the current theme
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

// Function to update task in todos array and local storage
function updateTask(task) {
  localStorage.setItem("task", JSON.stringify(todos));
}

// Function to count tasks and update UI
function countTasks() {
  const completedTasks = todos.filter((task) => task.isComplete);
  const totalTasks = todos.length - completedTasks.length;
  listLength.innerText = `${totalTasks} items left`;
}

// Event listener for filtering tasks
completedTodos.addEventListener("click", () => {
  // Add active filter class to completed todos and remove it from others
  completedTodos.classList.add("active-filter");
  all.classList.remove("active-filter");
  active.classList.remove("active-filter");

  // Clear existing tasks from the list
  clearTodoList();

  // Render only the completed tasks
  todos.forEach((task) => {
    if (task.isComplete) {
      createTask(task);
    }
  });

  // Update the task count
  countTasks();
});

all.addEventListener("click", () => {
  // Add active filter class to all todos and remove it from others
  completedTodos.classList.remove("active-filter");
  all.classList.add("active-filter");
  active.classList.remove("active-filter");

  // Clear existing tasks from the list
  clearTodoList();

  // Render all tasks
  todos.forEach((task) => {
    createTask(task);
  });
});

active.addEventListener("click", () => {
  // Add active filter class to active todos and remove it from others
  completedTodos.classList.remove("active-filter");
  all.classList.remove("active-filter");
  active.classList.add("active-filter");

  // Clear existing tasks from the list
  clearTodoList();

  // Render only the active tasks
  todos.forEach((task) => {
    if (!task.isComplete) {
      createTask(task);
    }
  });
});

// Clear existing tasks from the todo list
function clearTodoList() {
  while (todolist.firstChild) {
    todolist.firstChild.remove();
  }
}

// Event listener for switching theme
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

// Event listener for deleting tasks
todolist.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const todo = e.target.parentElement;
    const taskId = todo.getAttribute("id");
    const taskIdNum = parseInt(taskId);

    // Remove task from todos array
    todos = todos.filter((item) => item.id !== taskIdNum);

    // Update local storage
    updateTask();

    // Remove task from todo list
    todo.remove();

    // Update task count
    countTasks();
  }
});

// Event listener for clearing completed tasks
completed.addEventListener("click", () => {
  // Select all completed tasks
  const completedTasks = document.querySelectorAll(".complete");

  // Remove completed tasks from the todos array and the todo list
  completedTasks.forEach((task) => {
    const taskId = task.getAttribute("id");
    const taskIdNum = parseInt(taskId);

    // Remove task from todos array
    todos = todos.filter((item) => item.id !== taskIdNum);

    // Update local storage
    updateTask();

    // Remove task from todo list
    task.remove();
  });

  // Update task count
  countTasks();
});
