import { ADD_TASK, CHANGE_STATUS, CHANGE_STATUS_MULTI_TASK, DELETE_MULTI_TASK, DELETE_TASK, GET_ALL_TASK } from "./constants"

export const addTask = nameTask =>{
    return {
        type : ADD_TASK,
        payload : {nameTask}
    }
}

export const getAllTask = (allTasks) =>{    
    return {
        type : GET_ALL_TASK,
        payload : {allTasks}
    }
}

export const deleteTask = idDelete =>{
    return {
        type : DELETE_TASK,
        payload: {idDelete}
    }
}

export const changeStatusMultiTask = (arrIdChangeStatus, statusCurrent) =>{
    return {
        type : CHANGE_STATUS_MULTI_TASK,
        payload: {arrIdChangeStatus, statusCurrent}
    }
}

export const changeStatusTask = (id) =>{
    return {
        type: CHANGE_STATUS,
        payload : {id}
    }
}

export const deleteMultiTask = (arrIdDelete) =>{
    return {
        type: DELETE_MULTI_TASK,
        payload : {arrIdDelete}
    }
}

