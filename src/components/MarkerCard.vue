<script setup>
import { computed } from 'vue'

const props = defineProps({
  marker: {
    type: Object,
    required: true
  }
})

const googleMapsUrl = computed(() => {
  const params = {
    api: '1',
    query: props.marker.name,
    query_place_id: props.marker.place_id
  }
  const urlSearchParams = new URLSearchParams(params).toString()
  return `https://www.google.com/maps/search/?${urlSearchParams}`
})
</script>

<template>
  <div class="flex flex-col hover:bg-neutral-50 rounded-lg py-4 px-6 transition break-words">
    <!-- {{ marker }} -->
    <p class="mb-1">{{ marker.name }}</p>
    <p class="text-sm text-neutral-800">{{ marker.formatted_address }}</p>

    <a :href="googleMapsUrl" target="_blank">Google Maps</a>

    <!-- https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJw91Uj19KtUYRWvKcoPb43jU -->
  </div>
</template>
