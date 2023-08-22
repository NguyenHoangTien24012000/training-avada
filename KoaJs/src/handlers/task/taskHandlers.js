import * as newData from "../../database/FireStore/taskRepository";

export async function handleGetAllTasks(ctx) {
  try {
    const allTasks = await newData.getAllTasks();
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
    const newTask = await newData.addTask(task);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data : newTask,
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

export async function handleChangeStatusTask(ctx) {
  try {
    const { id } = ctx.params;
    const isCompleted = await newData.changeStatusTask(id);
    return (ctx.body = {
      success: true,
      data : {isCompleted},
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

export async function handleDeleteTask(ctx) {
  try {
    const { id } = ctx.params;
    await newData.deleteTask(id);
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

export async function handleChangeMultipleStatus(ctx) {
  try {
    const { arrId, statusCurrent } = ctx.request.body;
    await newData.changeMultipleTask(arrId, statusCurrent);
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

export async function handleDeleteMultiple(ctx) {
  try {
    const { arrId } = ctx.request.body;
    await newData.deleteMultipleTask(arrId);
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
