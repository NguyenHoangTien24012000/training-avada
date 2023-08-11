import Router from "koa-router";
import { handleAddTask, handleChangeMultipleStatus, handleChangeStatusTask, handleDeleteMultiple, handleDeleteTask, handleGetAllTasks } from "../handlers/task/taskHandlers";

const router = new Router({
    prefix: "/api"
})

router.get('/tasks', handleGetAllTasks);
router.post('/tasks', handleAddTask);
router.put('/tasks/:id', handleChangeStatusTask);
router.delete('/tasks/:id', handleDeleteTask);
router.put('/tasks/multiple/change', handleChangeMultipleStatus);
router.delete('/tasks/multiple/delete', handleDeleteMultiple)

export default router;