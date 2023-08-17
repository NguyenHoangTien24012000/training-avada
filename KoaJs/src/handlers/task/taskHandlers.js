import {
  addTask,
  changeMultipleTask,
  changeStatusTask,
  deleteMultipleTask,
  deleteTask,
  getAllTasks,
} from "../../database/taskRepository";
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
//@hoangtien b thử delay xem các loading chạy đã oke chưa nhá. Mình thấy cái get mới có empty chưa có loading
export async function handleGetAllTasks(ctx) {
  try {
    const allTasks = getAllTasks();
    return (ctx.body = {
      success: true,
      data: allTasks,
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      error: error.message,
    });
  }
}

export async function handleAddTask(ctx) {
  try {
    const { task } = ctx.request.body;
    const newTask = addTask(task);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: newTask,
      message: "Add success!",
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      error: error.message,
    });
  }
}

export function handleChangeStatusTask(ctx) {
  try {
    const { id } = ctx.params;
    changeStatusTask(id);
    return (ctx.body = {
      success: true,
      message: "Update success!",
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
    });
  }
}

export function handleDeleteTask(ctx) {
  try {
    const { id } = ctx.params;
    deleteTask(id);
    return (ctx.body = {
      success: true,
      message: "Delete success!",
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
    });
  }
}

export function handleChangeMultipleStatus(ctx) {
  try {
    const { arrId, statusCurrent } = ctx.request.body;
    changeMultipleTask(arrId, statusCurrent);
    return (ctx.body = {
      success: true,
      message: "Change status success!",
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
    });
  }
}

export function handleDeleteMultiple(ctx) {
  try {
    const { arrId } = ctx.request.body;
    deleteMultipleTask(arrId);
    return (ctx.body = {
      success: true,
      message: "Delete success!",
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
    });
  }
}
