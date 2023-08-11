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
      return state.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      );
    case DELETE_TASK:
      const { idDelete } = payload;
      return state.filter(task => task.id !== idDelete);
    case CHANGE_STATUS_MULTI_TASK:
      const { arrIdChangeStatus, statusCurrent } = payload;
      return state.map(task =>
        arrIdChangeStatus.includes(task.id)
          ? { ...task, isCompleted: !statusCurrent }
          : task
      );
    case DELETE_MULTI_TASK:
      const { arrIdDelete } = payload;
      return state.filter(task => !arrIdDelete.includes(task.id));
    case GET_ALL_TASK:
      const { allTasks } = payload;
      return [...allTasks];
    default:
      return state;
  }
};
