import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, getDoc, addDoc, deleteDoc, doc, updateDoc, onSnapshot, orderBy, query, writeBatch } from 'firebase/firestore';


export const useCreateTaskStore = defineStore('createTaskStore', () => {
const { $db } = useNuxtApp();
const taskList = ref([]);
const taskCollection = collection($db, 'tasks');
const taskListName = ref('');
const msg = ref('');
const description = ref('');
const dueDate = ref('');
const today = new Date().toLocaleDateString('en-US');

// Function to add a task
const addTask = async (taskLength) => {
if (msg.value.trim() === '') return; // Prevent empty tasks
const maxOrder = taskLength.length > 0
    ? Math.max(...taskLength.map(task => task.order)) 
    : 0;

const docRef = await 
    addDoc(taskCollection, 
        {text: msg.value, 
        completed: false, 
        dueDate: dueDate.value 
        ? dueDate.value 
        : today, 
        listName: taskListName.value, 
        order: maxOrder + 1,
        description: description.value}
    );
msg.value = ''; // Clear input field
dueDate.value = ''; // Clear input field
};

const setDate = (day) => {
    dueDate.value = day.toLocaleDateString('en-US');
};

return {
addTask,
msg,
description,
dueDate,
taskListName,
taskList,
setDate,
};

})