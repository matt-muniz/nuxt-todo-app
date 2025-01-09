<script setup lang="ts">
</script>

<template>
  <Header />
  <div class="bg-blue-100 min-h-screen relative">
    <div class="mx-auto p-4 pb-16 md:w-6/12">
      <TodaysTasks />
      <CreateTask />
    </div>
  </div>
  <div class="absolute bottom-4 right-4">
    <input type="datetime-local" class="p-2 border rounded" />
  </div>
  <Footer />
</template>