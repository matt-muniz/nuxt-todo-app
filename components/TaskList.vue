<script setup>
import { useTaskStore } from '~/stores/readTaskStore';

const readTask = useTaskStore();

</script>
<template>
  <div>
    <h1>Task List</h1>
    <ul>
      <li 
        v-for="task 
        in readTask.tasks" 
        :key="task.id">
          {{ task.title }}
          <span>{{ task.date }}</span>
      </li>
    </ul>
  </div>
</template>

