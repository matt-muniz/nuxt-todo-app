<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '~/stores/readTaskStore';

const readTask = useTaskStore();

import { onMounted } from 'vue';

const today = new Date().toISOString().split('T')[0];

const todaysTasks = computed(() => {
  return readTask.taskList.filter(task => task.dueDate === today);
});

onMounted(() => {
  readTask.fetchTasks();
})
</script>
<template>
  <div>
    <h1>Todays Task List:</h1>
    <ul>
      <li 
        v-for="task 
        in todaysTasks" 
        :key="task.id">
          {{ task.text }} - {{ task.dueDate }} - {{ task.order}}
      </li>
    </ul>
  </div>
</template>