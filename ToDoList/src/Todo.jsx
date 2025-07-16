import { useState, useEffect } from "react";
import "./Todo.css";

function Todo() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("my-todo-list");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("my-todo-list", JSON.stringify(tasks));
  }, [tasks]);

  // Set current year once when component loads
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  function handleAddClick() {
    if (inputValue.trim() === "") return;

    const newTask = {
      text: inputValue,
      status: "pending",
    };

    setTasks((t) => [...t, newTask]);
    setInputValue("");
  }

  function handleDelete(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].status =
      updatedTasks[index].status === "pending" ? "completed" : "pending";
    setTasks(updatedTasks);
  }

  return (
    <>
      <div className="toDoList">
        <h1>To-Do App</h1>

        <div className="new">
          <h3 className="heading">New Task:</h3>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddClick();
              }
            }}
            id="newTask"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="addButton" onClick={handleAddClick}>
            Add
          </button>
        </div>

        <div className="lists header">
          <h4>No.</h4>
          <h4>Todo Items</h4>
          <h4>State</h4>
          <h4>Actions</h4>
        </div>

        {tasks.map((task, index) => (
          <div className="lists items" key={index}>
            <h4>{index + 1}.</h4>
            <h4>{task.text}</h4>
            <h4>{task.status}</h4>
            <div>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button
                className={task.status === "completed" ? "comp" : ""}
                onClick={() => handleComplete(index)}
              >
                {task.status === "pending" ? "Complete" : "Undo"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer style={{ textAlign: "center", marginTop: "30px" }}>
        <p>© {year} ToDo. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Todo;
