import Router from "koa-router";
import * as handleTask from "../handlers/taskHandlers";

const router = new Router({
    prefix: "/api"
})

router.get('/tasks', handleTask.handleGetAllTasks);
router.post('/task', handleTask.handleAddTask);
router.put('/task/:id', handleTask.handleChangeStatusTask);
router.delete('/task/:id', handleTask.handleDeleteTask);
router.put('/tasks', handleTask.handleChangeMultipleStatus);
router.delete('/tasks', handleTask.handleDeleteMultiple)

export default router;