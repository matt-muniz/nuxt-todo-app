<template>
    <div v-if="prop.task.description !== '' && createDescription.isEditingText != prop.task.id">
        <div class="flex justify-between items-center">
            <span 
            @dblclick="createDescription.editDescription(prop.task.id)"
            >{{ prop.task.description }}</span>
            <button
                @click="createDescription.removeDescription(prop.task.id)"
                class="mr-3 text-red-500 bg-gray-100 p-1 rounded-md hover:bg-red-500 hover:text-white">
                Delete
            </button>
        </div>
    </div>
    <div v-else>
        <input
            type="text" 
            @keyup.enter="createDescription.addDescription(prop.task.id, $event.target.value)"
            placeholder="Add a description" 
            class="mt-2 p-2 border rounded-md w-full"
            v-model="createDescription.desc"
        />
        <div v-if="createDescription.isEditingText === prop.task.id" class="flex justify-end mt-2">
            <button
                @click="createDescription.addDescription(prop.task.id, createDescription.desc)"
                class="mr-2 text-green-500 bg-gray-100 p-1 rounded-md hover:bg-green-500 hover:text-white">
                Save
            </button>
            <button
                @click="createDescription.cancelEdit()"
                class="text-gray-500 bg-gray-100 p-1 rounded-md hover:bg-gray-500 hover:text-white">
                Cancel
            </button>
        </div>
    </div>
</template>

<script setup>
import { useDescriptionStore } from '~/stores/createDescriptionStore';

const createDescription = useDescriptionStore();

const prop = defineProps({
    task: Object
});
</script>