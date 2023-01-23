<script setup>
defineProps({
  marker: Object
})
</script>

<template>
  <div class="flex flex-col hover:bg-neutral-50 rounded-lg py-4 px-6 transition break-words">
    <p class="mb-1">{{ marker.name }}</p>
    <p class="text-sm text-neutral-800">{{ marker.formatted_address }}</p>
  </div>
</template>
