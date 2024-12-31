import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import { getFirestore, collection, deleteDoc, doc } from 'firebase/firestore';

export const useDeleteTaskStore = defineStore('deleteTaskStore', () => {
    const { $firestore } = useNuxtApp();
    const db = getFirestore($firestore);

    const deleteAllTasks = async () => {
        const tasksCollection = collection(db, 'tasks');
        const snapshot = await tasksCollection.get();
        const batch = db.batch();

        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
    };

    const deleteTask = async (taskId) => {
        const taskDoc = doc(db, 'tasks', taskId);
        await deleteDoc(taskDoc);
    };

    return {
        deleteAllTasks,
        deleteTask
    };
});