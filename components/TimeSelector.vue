<template>
    <div >
        <div class="max-w-lg mx-auto bg-blue-100 mt-5 p-4 rounded-md shadow-lg">
            <div class="flex justify-between space-x-4 mb-5">
                <button @click="cancel" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">Cancel</button>
                <button @click="done(selectedTime)" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200">Done</button>
            </div>
            <div class="py-5 flex items-center justify-center bg-gray-100">
                <label for="time" class="text-lg font-medium text-gray-700 mr-4">Select Time:</label>
                <select v-model="selectedTime.hour" name="hours" id="hours" class="p-2 border border-gray-300 rounded-md">
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                </select>
                <span class="text-lg font-medium text-gray-700 mx-2">:</span>
                <select v-model="selectedTime.minute" name="minutes" id="minutes" class="p-2 mr-2 border border-gray-300 rounded-md">
                    <option v-for="minute in minutes" :key="minute" :value="minute">{{ `${minute}`.toString().padStart(2, '0') }}</option>
                </select>
                <select v-model="selectedTime.ampm" name="ampm" id="ampm" class="p-2 border border-gray-300 rounded-md">
                    <option value="AM">AM</option>
                    <option value="PM">PM</option> 
                </select>
            </div>
            <h1 class="flex justify-center mt-5 text-red-500 font-bold">{{ useTaskStore.errorMessage }}</h1>
        </div>
    </div>
</template>

<script setup>
import { useCreateTaskStore } from '~/stores/createTaskStore';

const useTaskStore = useCreateTaskStore();

const emit = defineEmits(); // defineEmits is used to define the emit function

const hours = ref(Array.from({ length: 12 }, (_, i) => i + 1));
// const minutes = ref(Array.from({ length: 12 }, (_, i) => (i*5).toString().padStart(2, '0')));
const minutes = ref(Array.from({ length: 12 }, (_, i) => (i*5)));

const selectedTime = ref({
    hour: 1,
    minute: 0,
    ampm: 'AM'
});

const cancel = () => {
    emit('cancel');
};

const done = (time) => {
    useTaskStore.setTime(time);
    console.log(useTaskStore.errorMessage);
    if (useTaskStore.errorMessage) return;
    emit('done');
};

</script>