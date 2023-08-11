import {
  ADD_TASK,
  CHANGE_STATUS,
  CHANGE_STATUS_MULTI_TASK,
  DELETE_MULTI_TASK,
  DELETE_TASK,
  GET_ALL_TASK,
} from "./constants";

export const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      const { nameTask } = payload;
      return [...state, { id: Date.now(), name: nameTask, isCompleted: false }];
    case CHANGE_STATUS:
      const { id } = payload;
      const indexComplete = state.findIndex((task) => task.id === id);
      const {isCompleted} = state[indexComplete];
      state[indexComplete].isCompleted = !isCompleted;
      return [...state];
    case DELETE_TASK:
      const { idDelete } = payload;
      let indexDelete = state.findIndex((task) => task.id === idDelete);
      state.splice(indexDelete, 1);
      return [...state];
    case CHANGE_STATUS_MULTI_TASK:
      const { arrIdChangeStatus, statusCurrent } = payload;
      const arrTaskComplete = state.map((task) => {
        if (arrIdChangeStatus.includes(task.id)) {
          return { ...task, isCompleted: !statusCurrent };
        }
        return task;
      });
      return arrTaskComplete;
    case DELETE_MULTI_TASK:
      let { arrIdDelete } = payload;
      const arrTaskDeleted = state.filter(
        (task) => !arrIdDelete.includes(task.id)
      );
      return arrTaskDeleted;
    case GET_ALL_TASK:
      const {allTasks} = payload;
      return [...allTasks];
    default:
      throw new Error("Invalid action");
  }
};
