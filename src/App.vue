<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto py-4 md:py-6 px-4 min-h-screen flex flex-col">
    <nav class="flex gap-x-5 text-sm mb-4 text-neutral-800">
      <RouterLink to="/">
        Home
      </RouterLink>
      <RouterLink to="/log-in">
        Log in
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>
