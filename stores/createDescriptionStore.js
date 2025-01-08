import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const useDescriptionStore = defineStore('description', () => {
    const { $db } = useNuxtApp();
    const taskCollection = collection($db, 'tasks');

    const addDescription = async (taskId, description) => {
        const docRef = doc($db, 'tasks', taskId);
        await updateDoc(docRef, { description });
    };

    const updateDescription = async (taskId, newDescription) => {
        const docRef = doc($db, 'tasks', taskId);
        await updateDoc(docRef, { description: newDescription });
    };

    const removeDescription = async (id) => {
        const docRef = doc($db, 'tasks', id);
        await updateDoc(docRef, { description: '' });
    };

    return {
        addDescription,
        updateDescription,
        removeDescription
    };
});