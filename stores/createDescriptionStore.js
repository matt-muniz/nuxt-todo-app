import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const useDescriptionStore = defineStore('description', () => {
    const { $db } = useNuxtApp();
    const taskCollection = collection($db, 'tasks');
    const isEditingText = ref('');
    const desc = ref('');

    const addDescription = async (taskId, description) => {
        if (!description) return;
        const docRef = doc($db, 'tasks', taskId);
        await updateDoc(docRef, { description });
        isEditingText.value = '';
    };

    const updateDescription = async (taskId, newDescription) => {
        const docRef = doc($db, 'tasks', taskId);
        await updateDoc(docRef, { description: newDescription });
    };

    const removeDescription = async (id) => {
        const docRef = doc($db, 'tasks', id);
        await updateDoc(docRef, { description: '' });
        desc.value = '';
    };

    const editDescription = async (id, newTask) => { 
        isEditingText.value = id;
    };

    const cancelEdit = () => {
        isEditingText.value = ''; // Reset editing state
    };

    return {
        addDescription,
        updateDescription,
        removeDescription,
        editDescription,
        cancelEdit,
        isEditingText,
        desc
    };
});