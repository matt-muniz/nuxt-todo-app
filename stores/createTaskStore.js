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
const today = new Date();
const time = ref('');
const errorMessage = ref('');

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
        : today.toLocaleDateString('en-US'), 
        listName: taskListName.value, 
        order: maxOrder + 1,
        description: description.value,
        time: time.value}
    );
msg.value = ''; // Clear input field
dueDate.value = ''; // Clear input field
};

const setDate = (day) => {
    if (day.getDate() >= today.getDate()) {
        dueDate.value = day.toLocaleDateString('en-US');
        errorMessage.value = '';
    }else {
        dueDate.value = today;
        errorMessage.value = 'Please select todays date or a future date';
        return;
    }

};

const padWithLeadingZeros = (number) => {
    return number.toString().padStart(2, '0');
}

const setTime = (setTime) => {
    const setTimeString = `${setTime.hour}:${padWithLeadingZeros(setTime.minute)} ${setTime.ampm}`;
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHour + currentMinutes / 60;
    const setTimeInMinutes =
        setTime.ampm === 'PM' && setTime.hour === 12 ? setTime.hour + setTime.minute / 60 :
        setTime.ampm === 'PM' && setTime.hour != 12 ? setTime.hour + 12 + setTime.minute / 60 :
        setTime.ampm === 'AM' && setTime.hour === 12 ? setTime.hour * 0 + setTime.minute / 60 : 
        setTime.hour + setTime.minute / 60;

    if (setTimeInMinutes < currentTime && today || setTimeInMinutes < currentTime && dueDate.value === today) {
        errorMessage.value = 'Please select a time that is not in the past.';
        return;
    }

    time.value = setTimeString;

    errorMessage.value = '';
};

return {
addTask,
msg,
description,
dueDate,
taskListName,
taskList,
errorMessage,
setDate,
setTime
};

})