import axios from "axios";

export async function getAllTask(callBack) {
  try {
    const res = await axios.get("http://localhost:8080/api/tasks");
    const { data } = res.data;
    callBack(data);
  } catch (error) {
    throw new Error("Get all task failed ", error.message);
  }
}

export async function addNewTask(task, callBack) {
  try {
    const res = await axios.post("http://localhost:8080/api/tasks", task);
    const { data } = res;
    callBack(data);
  } catch (error) {
    throw new Error("Add task failed ", error.message);
  }
}

export async function changeStatusTask(id, callBack) {
  try {
    const res = await axios.put(`http://localhost:8080/api/tasks/${id}`);
    const { data } = res;
    callBack(data);
  } catch (error) {
    throw new Error("Change status failed ", error.message);
  }
}

export function deleteTask(id, callBack) {
  try {
    const res = axios.delete(`http://localhost:8080/api/tasks/${id}`);
    const { data } = res;
    callBack(data);
  } catch (error) {
    throw new Error("Delete task failed ", error.message);
  }
}

export async function changeMultipleTask(arrId, statusCurrent, callBack) {
  try {
    const res = await axios.put(
      "http://localhost:8080/api/tasks/multiple/change",
      {
        arrId,
        statusCurrent,
      }
    );
    const { data } = res;
    callBack(data);
  } catch (error) {
    throw new Error("Update task failed ", error.message);
  }
}

export async function deleteMultipleTask(arrId, callBack) {
  try {
    const res = await axios.delete(
      "http://localhost:8080/api/tasks/multiple/delete",
      {
        data: { arrId: arrId },
      }
    );
    const { data } = res;
    callBack(data);
  } catch (error) {
    throw new Error("Update task failed ", error.message);
  }
}
