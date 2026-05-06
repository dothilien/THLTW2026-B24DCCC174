const onFinish = (values) => {
  const newTask = {
    id: Date.now().toString(),
    ...values,
    status: "todo"
  };

  setTasks(prev => [...prev, newTask]);
};

const todo = tasks.filter(t => t.status === "todo");
const doing = tasks.filter(t => t.status === "doing");
const done = tasks.filter(t => t.status === "done");
const onDragEnd = (result) => {
  if (!result.destination) return;

  const newStatus = result.destination.droppableId;

  const updatedTasks = tasks.map(task =>
    task.id === result.draggableId
      ? { ...task, status: newStatus }
      : task
  );

  setTasks(updatedTasks);
};