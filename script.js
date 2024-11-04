let tasks = [];

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = storedTasks.map((task, index) => ({
        id: index + 1,
        name: task.name,
        status: task.status
    }));
    renderTasks();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    
    if (task === "") {
        alert("Please enter a task");
        return;
    }
    
    const taskObj = {
        id: tasks.length + 1,
        name: task,
        status: "In progress"
    };
    
    tasks.push(taskObj);
    taskInput.value = ""; // Clear the input field
    saveTasks(); // Save to local storage
    renderTasks();
}

function getTasks() {
    loadTasks(); // Load tasks from local storage
}

function renderTasks() {
    const taskTableBody = document.getElementById("taskTableBody");
    taskTableBody.innerHTML = ""; // Clear existing rows
    
    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.name}</td>
            <td>${task.status}</td>
            <td>
                <button onclick="editTask(${index})" class="btn edit-btn">Edit</button>
                <button onclick="deleteTask(${index})" class="btn delete-btn">Delete</button>
                <button onclick="finishTask(${index})" class="btn finished-btn">Finished</button>
            </td>
        `;
        
        taskTableBody.appendChild(row);
    });
}

function editTask(index) {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].name; // Set the input field to the task name
    deleteTask(index); // Remove the task from the list to allow re-adding it
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks(); // Save changes to local storage
    renderTasks();
}

function finishTask(index) {
    tasks[index].status = "Finished";
    saveTasks(); // Save changes to local storage
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add event listener for the Enter key
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask(); // Call addTask function when Enter is pressed
    }
});