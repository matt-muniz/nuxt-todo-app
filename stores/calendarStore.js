import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCalendarStore = defineStore('calendar', () => {

    const setCurrentDate = ref(new Date());
    const currentDate = ref(new Date());

    const month = computed(() => setCurrentDate.value.toLocaleString('default', { month: 'short' }));
    const year = computed(() => setCurrentDate.value.getFullYear());
    const weeks = computed(() => {
        const startOfMonth = new Date(setCurrentDate.value.getFullYear(), setCurrentDate.value.getMonth(), 1);
        const endOfMonth = new Date(setCurrentDate.value.getFullYear(), setCurrentDate.value.getMonth() + 1, 0);
        const startDate = startOfMonth.getDay() === 0 ? startOfMonth : new Date(startOfMonth.setDate(startOfMonth.getDate() - startOfMonth.getDay()));
        const endDate = endOfMonth.getDay() === 6 ? endOfMonth : new Date(endOfMonth.setDate(endOfMonth.getDate() + (6 - endOfMonth.getDay())));
        const weeks = [];
        let currentWeek = [];
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            currentWeek.push({
                date: new Date(date),
                isCurrentMonth: date.getMonth() === setCurrentDate.value.getMonth(),
            });
            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }
        return weeks;
    });
    const currentDay = computed(() => setCurrentDate.value.getDate());

    const prevMonth = () => {
        setCurrentDate.value = new Date(setCurrentDate.value.setMonth(setCurrentDate.value.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate.value = new Date(setCurrentDate.value.setMonth(setCurrentDate.value.getMonth() + 1));
    };

    const markCurrentDay = (date) => {
        return date.getMonth() === currentDate.value.getMonth() && date.getDate() === currentDay.value;
    };

    return {
        setCurrentDate,
        currentDate,
        month,
        year,
        weeks,
        currentDay,
        prevMonth,
        nextMonth,
        markCurrentDay,
    };
});