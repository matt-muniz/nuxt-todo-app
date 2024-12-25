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
      </li>
    </ul>
  </div>
</template>

