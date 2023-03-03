<script setup>
import { computed } from 'vue'

import { useMapStore } from '../stores/map'

const store = useMapStore()

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
  <div class="flex justify-between bg-neutral-50 hover:bg-neutral-100 rounded-lg py-4 px-6 transition break-words">
    <div class="flex flex-col">
      <a :href="googleMapsUrl" target="_blank" class="mb-1">{{ marker.name }}</a>
      <p class="text-sm text-neutral-600">{{ marker.formatted_address }}</p>
    </div>
    <button @click.prevent="store.removeMarker(marker)" class="self-start">✕</button>
  </div>
</template>
