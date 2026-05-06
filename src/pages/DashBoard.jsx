const total = tasks.length;
const done = tasks.filter(t => t.status === "done").length;
const overdue = tasks.filter(
  t => new Date(t.deadline) < new Date() && t.status !== "done"
).length;