import path from "path";
import tasks from "./tasks.json";
import fs from "fs";
export function getAllTasks() {
  return tasks;
}
import crypto from "crypto";

export function addTask(task) {
  const id = crypto.randomBytes(16).toString("hex");
  const newTask = { id, name: task, isCompleted: false };
  const tasksUpdate = [...tasks, newTask];
  fs.writeFileSync(
    path.join(__dirname, "tasks.json"),
    JSON.stringify(tasksUpdate)
  );
}

export function changeStatusTask(id) {
  const newTasks = tasks.map((task) => {
    return task.id === parseInt(id)
      ? { ...task, isCompleted: !task.isCompleted }
      : task;
  });
  fs.writeFileSync(
    path.join(__dirname, "tasks.json"),
    JSON.stringify(newTasks)
  );
}

export function deleteTask(id) {
  const newTasks = tasks.filter((task) => task.id !== parseInt(id));
  fs.writeFileSync(
    path.join(__dirname, "tasks.json"),
    JSON.stringify(newTasks)
  );
}

export function changeMultipleTask(arrId, statusCurrent) {
  const tasksUpdate = tasks.map((task) => {
    if (arrId.includes(task.id)) {
      return { ...task, isCompleted: !statusCurrent };
    }
    return task;
  });
  fs.writeFileSync(
    path.join(__dirname, "tasks.json"),
    JSON.stringify(tasksUpdate)
  );
}

export function deleteMultipleTask(arrId) {
  const tasksUpdate = tasks.filter((task) => !arrId.includes(task.id));
  fs.writeFileSync(
    path.join(__dirname, "tasks.json"),
    JSON.stringify(tasksUpdate)
  );
}
