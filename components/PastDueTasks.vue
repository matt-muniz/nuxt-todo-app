<template>
    <div class="p-3 bg-red-100 rounded-lg">
        <h1 class="font-bold text-[20px] md:text-[25px]">Past Due Tasks</h1>
        <ul class="mt-3">
            <li 
            class="p-2 mt-2 bg-white shadow-md rounded-md"
            v-for="task in pastDueTasks" 
            :key="task.id">
                <div class="flex items-center">
                    <input 
                    type="checkbox" 
                    v-model="task.completed" 
                    @change="updateTask.completedTask(task.id, task.completed)" />
                    <div class="flex justify-between w-full items-center">
                        <span :class="[{ completed: task.completed }, 'cursor-pointer', 'ml-3']">{{ task.text }}</span> 
                        <span>Due: {{ task.dueDate }}</span>
                    </div>
                </div> 
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import { useReadTaskStore } from '~/stores/readTaskStore';
import { useUpdateTaskStore } from '~/stores/updateTaskStore';

const readTask = useReadTaskStore();
const updateTask = useUpdateTaskStore();

const today = new Date().toLocaleDateString('en-US');

const pastDueTasks = computed(() => {
    return readTask.taskList.filter(task => {
        const dueDate = new Date(task.dueDate).toLocaleDateString('en-US');
        return dueDate < today && !task.completed;
    });
});

onMounted(() => {
  readTask.fetchTasks();
})

</script>
