import { defineStore } from 'pinia';
import { ref } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import { useToggleCreateTaskStore } from './toggleCreateTaskStore';
import { useCreateTaskStore } from './createTaskStore';


export const useUpdateTaskStore = defineStore('updateTaskStore', () => {

    const { $db } = useNuxtApp();
    const today = new Date();

    const toggleCreateTaskStore = useToggleCreateTaskStore();
    const createTaskStore = useCreateTaskStore();
    
    const updateTaskItem = async (taskId, msg, newDueDate, newTime) => {
        if (msg.trim() === '') return; // Prevent empty tasks
        const docRef = doc($db, 'tasks', taskId);
        await updateDoc(docRef, { text: msg, dueDate: newDueDate ? newDueDate : today.toLocaleDateString('en-US'), time: newTime });

        toggleCreateTaskStore.toggleMenu();

        createTaskStore.msg = '';
        createTaskStore.dueDate = '';
        createTaskStore.time = ''; 
    };

return {
    updateTaskItem,
}
})