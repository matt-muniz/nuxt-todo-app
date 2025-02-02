<script setup>
import { ref, computed } from 'vue';
import { useReadTaskStore } from '~/stores/readTaskStore';
import { useDeleteTaskStore } from '~/stores/deleteTaskStore';
import { useUpdateTaskStore } from '~/stores/updateTaskStore';
import { useToggleCreateTaskStore } from '~/stores/toggleCreateTaskStore';

const readTask = useReadTaskStore();
const deleteTask = useDeleteTaskStore();
const updateTask = useUpdateTaskStore();
const toggleCreateTaskView = useToggleCreateTaskStore();

import { onMounted } from 'vue';
import Description from './Description.vue';

// const today = new Date().toISOString().split('T')[0];
// const today2 = new Date().toLocaleDateString();

const today = new Date().toLocaleDateString('en-US');


const todaysTasks = computed(() => {
  return readTask.taskList.filter(task => task.dueDate === today);
});

onMounted(() => {
  readTask.fetchTasks();
})
</script>
<template>
  <div class="p-3 bg-gray-100 border-gray-200 rounded-lg">
    <div class="flex justify-between">
      <h1 class="font-bold text-[20px] md:text-[25px]">Tasks For Today:</h1> 
      <span>{{ today }}</span>
    </div>
    <ul class="mt-3">
      <li 
        class="p-2 bg-white shadow-md rounded-md"
        v-for="task 
        in todaysTasks" 
        :key="task.id">
        <div class="flex">
          <input 
            type="checkbox" 
            v-model="task.completed"
          />
          <div class="justify-between w-full flex items-center">
            <span
              @dblclick="toggleCreateTaskView.showMenu ? null : toggleCreateTaskView.editTaskItem(task.id, task.text, task.dueDate, task.time)"
              class="cursor-pointer ml-3">{{ task.text }} Time to be completed: {{ !task.time ? 'N/A' : task.time }}
            </span>
            <button
              @click="deleteTask.deleteTask(task.id)"
              class="mr-3 text-red-500 bg-gray-100 p-1 rounded-md hover:bg-red-500 hover:text-white">
              Delete
            </button>
          </div>
        </div>
        <Description :task="task" />
      </li>
    </ul>
    <div class="mt-3 flex justify-end">
      <button class="border pt-2 pb-2 pl-3 pr-3 rounded-md bg-gray-300">View All Tasks</button>
    </div>
  </div>
</template>