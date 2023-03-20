<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto py-4 md:py-10 px-4">
    <nav>
      <RouterLink to="/">
        Home
      </RouterLink>
      <RouterLink to="/about">
        About
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>
