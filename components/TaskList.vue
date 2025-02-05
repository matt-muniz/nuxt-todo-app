<script setup>
import { ref, computed } from 'vue';
import { useReadTaskStore } from '~/stores/readTaskStore';
import { useDeleteTaskStore } from '~/stores/deleteTaskStore';
import { useUpdateTaskStore } from '~/stores/updateTaskStore';
import { useToggleCreateTaskStore } from '~/stores/toggleCreateTaskStore';
import Description from './Description.vue';

const readTask = useReadTaskStore();
const deleteTask = useDeleteTaskStore();
const updateTask = useUpdateTaskStore();
const toggleCreateTaskView = useToggleCreateTaskStore();

onMounted(() => {
  readTask.fetchTasks();
})
</script>
<template>
  <div class="p-3 bg-gray-100 border-gray-200 rounded-lg">
    <div class="flex justify-between">
      <h1 class="font-bold text-[20px] md:text-[25px]">Task List:</h1>
    </div>
    <ul class="mt-3">
      <li 
        class="p-2 mt-2 bg-white shadow-md rounded-md"
        v-for="task 
        in readTask.taskList" 
        :key="task.id">
        <div>Task Due On: {{ task.dueDate }}</div>
        <div class="flex">
          <input 
            type="checkbox" 
            v-model="task.completed"
            @change="updateTask.completedTask(task.id, task.completed)"
          />
          <div class="justify-between w-full flex items-center">
            <span
              v-double-tap="() => toggleCreateTaskView.onDoubleTap(task.id, task.text, task.dueDate, task.time)"
              @dblclick="toggleCreateTaskView.showMenu ? null : toggleCreateTaskView.editTaskItem(task.id, task.text, task.dueDate, task.time)"
              :class="[{ completed: task.completed }, 'cursor-pointer', 'ml-3']">{{ task.text }} Time to be completed: {{ !task.time ? 'N/A' : task.time }}
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
  </div>
</template>

