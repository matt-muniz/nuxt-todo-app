<script setup>
import Settings from '~/assets/icons/settings.svg';
import Search from '~/assets/icons/search.svg';
import Home from '~/assets/icons/home.svg';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header class="text-black p-4 text-center flex items-center justify-between">
    <Settings class="text-[25px] md:text-[30px]" />
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <div v-if="route.name !== 'index'" class="absolute right-16">
      <NuxtLink to="/">
        <Home class="text-[25px] md:text-[30px]">Home</Home>
      </NuxtLink>
    </div>
    <Search class="text-[20px] md:text-[25px]" />
  </header>
</template>