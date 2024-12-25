<script setup>
import { ref, computed } from 'vue';
import { useReadTaskStore } from '~/stores/readTaskStore';

const readTask = useReadTaskStore();

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
  <div class="mt-5 mr-5 ml-5 p-3 bg-gray-100 border-gray-200 rounded-lg">
    <div class="flex justify-between">
      <h1 class="font-bold text-[20px] md:text-[25px]">Tasks For Today:</h1> 
      <span>{{ today }}</span>
    </div>
    <ul class="mt-3">
      <li 
        class="p-2 bg-white shadow-md mb-2 rounded-md"
        v-for="task 
        in todaysTasks" 
        :key="task.id">
          <span class="ml-3">{{ task.text }}</span>
      </li>
    </ul>
    <div class="mt-3 flex justify-end">
      <button class="border pt-2 pb-2 pl-3 pr-3 rounded-md bg-gray-300">View All Tasks</button>
    </div>
  </div>
</template>