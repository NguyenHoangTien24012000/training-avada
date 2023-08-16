import axios from "axios";
import { URL_BASE } from "../../config/constants";

export async function addNewTask(task, callBack) {
  try {
    const res = await axios.post(`${URL_BASE}/tasks`, task);
    const { data } = res;
    callBack(data);
  } catch (error) {
    console.error("Add task failed ", error.message);
  }
}

export async function changeStatusTask(id, callBack) {
  try {
    const res = await axios.put(`${URL_BASE}/tasks/${id}`);
    const { data } = res;
    callBack(data);
  } catch (error) {
    console.error("Change status failed ", error.message);
  }
}

export function deleteTask(id, callBack) {
  try {
    const res = axios.delete(`${URL_BASE}/tasks/${id}`);
    const { data } = res;
    callBack(data);
  } catch (error) {
    console.error("Delete task failed ", error.message);
  }
}

export async function changeMultipleTask(arrId, statusCurrent, callBack) {
  try {
    const res = await axios.put(`${URL_BASE}/tasks/multiple/change`, {
      arrId,
      statusCurrent,
    });
    const { data } = res;
    callBack(data);
  } catch (error) {
    console.error("Update task failed ", error.message);
  }
}

export async function deleteMultipleTask(arrId, callBack) {
  try {
    const res = await axios.delete(`${URL_BASE}/tasks/multiple/delete`, {
      data: { arrId: arrId },
    });
    const { data } = res;
    callBack(data);
  } catch (error) {
    console.error("Update task failed ", error.message);
  }
}
