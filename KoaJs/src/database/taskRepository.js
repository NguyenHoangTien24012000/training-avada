import path from 'path';
import tasks from './tasks.json';
import fs from "fs";
export function getAllTasks(){
    return tasks;
}


export function addTask(task){
    const newTask = {id: Date.now(), name : task, isCompleted : false};
    const tasksUpdate = [...tasks, newTask];
    fs.writeFileSync(
        path.join(__dirname, 'tasks.json'),
        JSON.stringify(tasksUpdate)
    )
}

export function changeStatusTask(id){
    const indexTask = tasks.findIndex(task => task.id === parseInt(id));
    const {isCompleted} = tasks[indexTask];
    tasks[indexTask].isCompleted = !isCompleted;
    fs.writeFileSync(
        path.join(__dirname, 'tasks.json'),
        JSON.stringify(tasks)
    )
}

export function deleteTask(id){
    const indexTask = tasks.findIndex(task => task.id === parseInt(id));
    tasks.splice(indexTask, 1);
    fs.writeFileSync(
        path.join(__dirname, 'tasks.json'),
        JSON.stringify(tasks)
    )
}

export function changeMultipleTask(arrId, statusCurrent){
    const tasksUpdate = tasks.map(task=>{
        if(arrId.includes(task.id)){
            return {...task, isCompleted : !statusCurrent}
        }
        return task;
    })
    fs.writeFileSync(
        path.join(__dirname, 'tasks.json'),
        JSON.stringify(tasksUpdate)
    )
}

export function deleteMultipleTask(arrId){
    const tasksUpdate = tasks.filter(task=> !arrId.includes(task.id));
    fs.writeFileSync(
        path.join(__dirname, 'tasks.json'),
        JSON.stringify(tasksUpdate)
    )
}