import { defineStore } from 'pinia';
import { ref } from 'vue';

function getRandomDate() {
  const today = new Date();
  const end = new Date();
  end.setMonth(today.getMonth() + 1);
  return new Date(today.getTime() + Math.random() * (end.getTime() - today.getTime()));
}

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref(Array.from({ length: 10 }, (_, id) => ({
    id,
    title: `Task ${id + 1}`,
    completed: false,
    date: getRandomDate()
  }))); 
  return {
    tasks,
  };
});