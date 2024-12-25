import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, getDoc, addDoc, deleteDoc, doc, updateDoc, onSnapshot, orderBy, query, writeBatch } from 'firebase/firestore';


export const useReadTaskStore = defineStore('taskStore', () => {
  const { $db } = useNuxtApp();
  const taskList = ref([]);
  const taskCollection = collection($db, 'tasks');
  
  const fetchTasks = async () => {
    // if(auth.currentUser){
      onSnapshot(query(taskCollection, orderBy("order", "asc")), (snapshot) => {
        taskList.value = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      })
    // }
  }

  return {
    fetchTasks,
    taskList,
  };
});