<template>
    <div class="flex">
        <div class="bg-red-100">
            <div class="flex justify-between space-x-4 m-4">
                <button @click="cancel" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">Cancel</button>
                <button @click="done" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200">Done</button>
            </div>
            <div class="flex items-center justify-between py-2 px-6">
                <div>
                <span class="text-lg font-bold text-gray-800">{{ useCalendar.month }} {{ useCalendar.year }}</span>
                </div>
                <div class="border rounded-lg px-1">
                    <button @click="useCalendar.prevMonth" class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center">
                        <svg class="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button @click="useCalendar.nextMonth" class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center">
                        <svg class="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="-mx-1 -mb-1">
                <h1 class="flex justify-center mt-5 text-red-500 font-bold">{{ useTaskStore.errorMessage }}</h1>
                <div class="flex justify-between m-5" v-for="(week, index) in useCalendar.weeks" :key="index">
                    <div class="px-2 py-2" v-for="day in week" :key="day.date">
                        <div @click="getCurrentDay(day.date)" :class="['rounded-md p-2 text-center', day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400', useCalendar.markCurrentDay(day.date) ? 'bg-blue-500 text-white' : '']">
                        {{ day.date.getDate() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCalendarStore } from '~/stores/calendarStore';
import { useCreateTaskStore } from '~/stores/createTaskStore';

const useCalendar = useCalendarStore();
const useTaskStore = useCreateTaskStore();

const emit = defineEmits(); // defineEmits is used to define the emit function

const cancel = () => {
    emit('cancel');
};

const done = () => {
    emit('done');
};

const getCurrentDay = (date) => {
    useTaskStore.setDate(date);
    if (useTaskStore.errorMessage) return;
    emit('done');
};

</script>