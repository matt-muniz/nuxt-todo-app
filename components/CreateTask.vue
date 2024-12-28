<template>
  <div>
    <div>
      <button @click="toggleMenu" class="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600">
        Create Task
      </button>
      <transition 
        name="slide-up"
      >
        <div v-if="showMenu" class="fixed h-3/5 bottom-14 left-0 right-0 bg-white p-4 shadow-lg">
          <h3 class="text-lg font-semibold">New Task</h3>
          <input type="text" placeholder="Task name" class="mt-2 p-2 border rounded w-full">
          <div>
          </div>
          <div>
            <button @click="toggleCalendar" class="bg-blue-100 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600">
              Choose Date
            </button>
          </div>
          <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600">
            Add Task
          </button>
          <button @click="toggleMenu" class="mt-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-600">
            Close
          </button>
        </div>
      </transition>
      <Transition name="slide-up">
        <div v-if="showCalendar" class="fixed h-3/5 bottom-14 left-0 right-0 overflow-auto">
          <Calendar @done="toggleCalendar" @cancel="toggleCalendar"/>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showMenu = ref(false);
const showCalendar = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value;
};
</script>

<style scoped>
.slide-up-enter-active, .slide-up-calendar-active, .slide-up-leave-active, .slide-up-calendar-leave-active {
  transition: transform 0.5s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}
</style>