import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, doc, onSnapshot, orderBy, query, getDoc, updateDoc} from 'firebase/firestore';


export const useReadTaskStore = defineStore('taskStore', () => {
  const { $db } = useNuxtApp();
  const taskList = ref([]);
  const taskCollection = collection($db, 'tasks');
  const fetchedData = ref({});
  
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

  const fetchDocuments = async (taskId) => {
    const docRef = doc($db, 'tasks', taskId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        fetchedData.value = data.text;
    } else {
        console.log('No such document!');
    }
}
  
  return {
    fetchTasks,
    fetchDocuments,
    fetchedData,
    taskList,
  };
});