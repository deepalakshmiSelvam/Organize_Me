import React, { useState } from "react";
import "./todo.css"
const Todo = () => {
  // State to hold the list of tasks and the new task being typed
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(""); // Holds the value of the input field
  const [isEditing, setIsEditing] = useState(false); // Determines if we're currently editing a task or adding a new one
  const [currentTask, setCurrentTask] = useState({}); // Stores the task being edited.

  //! function to handle the new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      // Make sure task isn't empty
      setTasks([...tasks, { id: Date.now(), text: newTask }]); // Add the new task to the list of tasks array. Each tasks gets a unique 'id' using Date.now().
      setNewTask(""); // Clear the input field after adding the task
    }
  };

  //! Function to handle deleting a task by its 'id'
  const deleteTask = (id) => {
    // Remove the task by index
    setTasks(tasks.filter((task) => task.id !== id)); // Filter out the task with the matching 'id' and update the state
  };
  //! Function to handle editing the task
  const handleEditTask = (task) => {
    setIsEditing(true); // set the 'isEditing state to true to indicate we're in edit mode'
    setNewTask(task.text); // Populate the input field with the text of the task we're editing
    setCurrentTask(task); // Store the task being edited in 'currentTask' so we can update it later
  };

  //! Function to handle updating a task after editing
  const handleUpdateTask = () => {
    setTasks(
      tasks.map(
        (task) =>
          task.id === currentTask.id ? { ...task, text: newTask } : task // Update the task's text if its id matches "currentTask.id", otherwise keep it unchanged
      )
    );
    setIsEditing(false); // Exit edit mode after updating
    setNewTask(""); // clear the input field
  };

  const handleChange = (e) => {
    setNewTask(e.target.value); // Update the input value
  };
  return (
    <div className="App">
      <h1>Organize Me</h1>
      {/* input field to type a new Task  and add update button*/}
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={handleChange}
          placeholder="Add or Update the task"
        />
        {/* Conditionally render the button for adding or updating based on 'isEditing' state */}
        {isEditing ? (<button onClick={handleUpdateTask}>Update Task</button>) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>
      <div className="task-list">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} >
              <span className="my-Text">{task.text}</span>
              <button onClick={() => handleEditTask(task)} className="btn-Edit">Edit</button>
              <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
