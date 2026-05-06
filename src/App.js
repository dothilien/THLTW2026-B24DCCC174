import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import TaskList from "./pages/TaskList";
import KanbanBoard from "./pages/KanbanBoard";

function App() {
  const [tasks, setTasks] = useState([]);

  // load data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(data);
  }, []);

  // save data
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // thêm task (có thể truyền xuống)
  const addTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: "Task mới",
      status: "todo",
      deadline: "2026-05-06"
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <>
      <button onClick={addTask}>Add Task</button>

      <Dashboard tasks={tasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
      <KanbanBoard tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;