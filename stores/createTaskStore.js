import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, getDoc, addDoc, deleteDoc, doc, updateDoc, onSnapshot, orderBy, query, writeBatch } from 'firebase/firestore';


// export const useCreateTaskStore = defineStore('taskStore', () => {
//   const { $db } = useNuxtApp();

// })