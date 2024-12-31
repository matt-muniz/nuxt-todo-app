<script setup>
import { useReadTaskStore } from '~/stores/readTaskStore';

const readTask = useReadTaskStore();

onMounted(() => {
  readTask.fetchTasks();
})
</script>
<template>
  <div>
    <h1>Task List:</h1>
    <ul>
      <li 
        v-for="task 
        in readTask.taskList" 
        :key="task.id">
          {{ task.text }}
        <button 
          class="mr-3 text-red-500 bg-gray-100 p-1 rounded-md hover:bg-red-500 hover:text-white">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

