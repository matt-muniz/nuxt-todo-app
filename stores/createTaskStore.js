import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, getDoc, addDoc, deleteDoc, doc, updateDoc, onSnapshot, orderBy, query, writeBatch } from 'firebase/firestore';


export const useCreateTaskStore = defineStore('createTaskStore', () => {
const { $db } = useNuxtApp();
const taskList = ref([]);
const taskCollection = collection($db, 'tasks');
const taskListName = ref('');
const msg = ref('');
const dueDate = ref('');

// Function to add a task
const addTask = async () => {
if (msg.value.trim() === '') return; // Prevent empty tasks
const maxOrder = taskList.value.length > 0
    ? Math.max(...taskList.value.map(task => task.order)) 
    : 0;

const docRef = await addDoc(taskCollection, {text: msg.value, completed: false, dueDate: dueDate.value, listName: taskListName.value, order: maxOrder + 1});
msg.value = ''; // Clear input field
dueDate.value = ''; // Clear input field
};

const setDate = (day) => {
    dueDate.value = day.toISOString().split('T')[0];
};

return {
addTask,
msg,
dueDate,
taskListName,
taskList,
setDate,
};

})