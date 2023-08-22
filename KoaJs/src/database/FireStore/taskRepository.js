const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const db = admin.firestore();
const db = getFirestore();

const taskCollectionRef = db.collection("tasks");

export async function addTask(taskName) {
  try {
    const taskDocumentRef = await taskCollectionRef.add({
      name: taskName,
      isCompleted: false,
    });

    const newTaskId = taskDocumentRef.id;
    const newTask = { id: newTaskId, name: taskName, isCompleted: false };

    return newTask;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllTasks() {
  try {
    const querySnapshot = await taskCollectionRef.get();

    const allTasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return allTasks;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function changeStatusTask(id) {
  const taskDocRef = taskCollectionRef.doc(id);
  try {
    const taskDocData = await taskDocRef.get();
    if (taskDocData.exists) {
      const statusCurrent = taskDocData.data().isCompleted;
      await taskDocRef.update({
        isCompleted: !statusCurrent,
      });
      return !statusCurrent;
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteTask(id) {
  try {
    const taskDocRef = taskCollectionRef.doc(id);
    const taskDocData = await taskDocRef.get();
    if (taskDocData.exists) {
      await taskDocRef.delete();
    }else{
        throw new Error("Task not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function changeMultipleTask(arrId, statusCurrent) {
    const batch = db.batch();
    try {
        arrId.forEach(idTask=>{
            const taskDocumentRef = taskCollectionRef.doc(idTask);
            batch.update(taskDocumentRef,{
                isCompleted : !statusCurrent
            })
        })
        await batch.commit();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteMultipleTask(arrId, statusCurrent) {
    const batch = db.batch();
    try {
        arrId.forEach(idTask=>{
            const taskDocumentRef = taskCollectionRef.doc(idTask);
            batch.delete(taskDocumentRef);
        })
        await batch.commit();
    } catch (error) {
        throw new Error(error.message);
    }
}
