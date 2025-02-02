<template>
  <div>
    <div>
      <button @click="toggleCreateTask.toggleMenu" class="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600">
        Create Task
      </button>
      <transition 
      name="slide-up"
      >
      <div v-if="toggleCreateTask.showMenu" class="fixed h-3/5 bottom-14 left-0 right-0 bg-white p-4 shadow-lg">
        <h3 class="text-lg font-semibold">New Task</h3>
          <input v-model="useTaskStore.msg" type="text" :placeholder="!toggleCreateTask.taskId ? 'Task Name' : toggleCreateTask.msg" class="mt-2 p-2 border rounded w-full">
          <div>
            <button @click="toggleCreateTask.toggleCalendar" class="bg-blue-100 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600">
              Choose Date
            </button>
          </div>
          <div>
            <button @click="toggleCreateTask.toggleTimeSelector" class="bg-green-100 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600">
              Choose Time
            </button>
          </div>
          <div v-if="!toggleCreateTask.taskId">
            <button @click="useTaskStore.addTask(readTask.taskList)" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600">
              Add Task
            </button>
          </div>
          <div v-else>
            <button @click="updateTaskStore.updateTaskItem(toggleCreateTask.taskId, useTaskStore.msg, useTaskStore.dueDate, useTaskStore.time)" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600">
              Update Task
            </button>
          </div>
          <button @click="toggleCreateTask.toggleMenu" class="mt-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-600">
            Close
          </button>
        </div>
      </transition>
      <Transition name="slide-up">
        <div v-if="toggleCreateTask.showCalendar" class="bg-white fixed h-3/5 bottom-14 left-0 right-0 overflow-auto">
          <Calendar @done="toggleCreateTask.toggleCalendar" @cancel="toggleCreateTask.toggleCalendar"/>
        </div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="toggleCreateTask.showTimeSelector" class="bg-white fixed h-3/5 bottom-14 left-0 right-0 overflow-auto">
          <TimeSelector @done="toggleCreateTask.toggleTimeSelector" @cancel="toggleCreateTask.toggleTimeSelector"/>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCreateTaskStore } from '~/stores/createTaskStore';
import { useReadTaskStore } from '~/stores/readTaskStore';
import { useToggleCreateTaskStore } from '~/stores/toggleCreateTaskStore';
import { useUpdateTaskStore } from '~/stores/updateTaskStore';

const useTaskStore = useCreateTaskStore();
const readTask = useReadTaskStore();
const toggleCreateTask = useToggleCreateTaskStore();
const updateTaskStore = useUpdateTaskStore();

</script>

<style scoped>
.slide-up-enter-active, .slide-up-calendar-active, .slide-up-leave-active, .slide-up-calendar-leave-active {
  transition: transform 0.5s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}
</style>