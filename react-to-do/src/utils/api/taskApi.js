import axios from "axios";

export function getAllTask(callBack) {
  axios
    .get("http://localhost:8080/api/tasks")
    .then((response) => {
      const { data } = response.data;
      callBack(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function addNewTask(task, callBack) {
  axios
    .post("http://localhost:8080/api/tasks", { task })
    .then((response) => {
      callBack();
    })
    .catch((error) => {
      throw new Error("Add task failed ", error.message);
    });
}

export function changeStatusTask(id, callBack) {
  axios
    .put(`http://localhost:8080/api/tasks/${id}`)
    .then((response) => {
      callBack();
    })
    .catch((error) => {
      throw new Error("Change status failed ", error.message);
    });
}

export function deleteTask(id, callBack) {
  axios
    .delete(`http://localhost:8080/api/tasks/${id}`)
    .then((response) => {
      callBack();
    })
    .catch((error) => {
      throw new Error("Delete task failed ", error.message);
    });
}

export function changeMultipleTask(arrId, statusCurrent, callBack) {
  axios
    .put("http://localhost:8080/api/tasks/multiple/change", {
      arrId,
      statusCurrent,
    })
    .then((response) => {
      callBack();
    })
    .catch((error) => {
      throw new Error("Update task failed ", error.message);
    });
}

export function deleteMultipleTask(arrId, callBack) {
  axios
    .delete("http://localhost:8080/api/tasks/multiple/delete", {
      data: { arrId: arrId },
    })
    .then((response) => {
      callBack();
    })
    .catch((error) => {
      throw new Error("Update task failed ", error.message);
    });
}
