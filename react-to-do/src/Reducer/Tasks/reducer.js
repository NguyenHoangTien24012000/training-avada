import {
  ADD_TASK,
  CHANGE_STATUS,
  CHANGE_STATUS_MULTI_TASK,
  DELETE_MULTI_TASK,
  DELETE_TASK,
  GET_ALL_TASK,
} from "./constants";

export const initialState = [
  { id: 1, name: "Learn about React", isCompleted: false },
  { id: 2, name: "Meet friend for lunch", isCompleted: false },
  { id: 3, name: "Build really cool todo app", isCompleted: true },
];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_TASK:
      return state;
    case ADD_TASK:
      const {nameTask} = payload;
      return [...state, { id: Date.now(), name: nameTask, isCompleted: false }];
    case CHANGE_STATUS:
      let {id, isCompleted} = payload;
      let indexComplete = state.findIndex((task) => task.id === id);
      state[indexComplete].isCompleted = !isCompleted;
      return [...state];
    case DELETE_TASK:
      const {idDelete} = payload
      let indexDelete = state.findIndex((task) => task.id === idDelete);
      state.splice(indexDelete, 1);
      return [...state];
    case CHANGE_STATUS_MULTI_TASK:
      const {arrIdChangeStatus, statusCurrent} = payload;
      const arrTaskComplete = state.map(task => {
        if(arrIdChangeStatus.includes(task.id)){
          return {...task, isCompleted: !statusCurrent};
        }
        return task;
      });
      return arrTaskComplete;
      case DELETE_MULTI_TASK:
        let {arrIdDelete} = payload;
        const arrTaskDeleted = state.filter(task=> !arrIdDelete.includes(task.id))
        return arrTaskDeleted;
    default:
      throw new Error("Invalid action");
  }
};
