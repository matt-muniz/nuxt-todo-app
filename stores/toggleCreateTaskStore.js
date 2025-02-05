import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToggleCreateTaskStore = defineStore('toggleCreateTask', () => {

const showMenu = ref(false);
const showCalendar = ref(false);
const showTimeSelector = ref(false);
const taskId = ref('');
const dueDate = ref('');
const time = ref('');
const msg = ref('');

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
    taskId.value = '';
    msg.value = '';
};
const toggleCalendar = () => {
    showCalendar.value = !showCalendar.value;
};
const toggleTimeSelector = () => {
    showTimeSelector.value = !showTimeSelector.value;
};

const editTaskItem = (id, newMsg, newDate, newTime) => {
    toggleMenu();
    taskId.value = id;
    msg.value = newMsg;
    time.value = newTime;
    dueDate.value = newDate;
}

const onDoubleTap = (id, newMsg, newDate, newTime) => { 
    // toggleCreateTaskView.showMenu ? null : toggleCreateTaskView.editTaskItem(task.id, task.text, task.dueDate, task.time)
    showMenu.value ? null : editTaskItem(id, newMsg, newDate, newTime)
}

return {
    showMenu,
    showCalendar,
    showTimeSelector,
    taskId,
    msg,
    time,
    dueDate,
    toggleMenu,
    toggleCalendar,
    toggleTimeSelector,
    editTaskItem,
    onDoubleTap,
}
})