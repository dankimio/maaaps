<script setup>
import { computed } from 'vue'

import { useMapStore } from '../stores/map'

const store = useMapStore()

const props = defineProps({
  marker: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
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
  <div class="flex justify-between bg-neutral-50 rounded-lg py-4 px-5 transition break-words">
    <div class="flex flex-col">
      <div class="flex gap-x-2 items-center mb-1">
        <span
          class="handle cursor-move bg-neutral-200 text-neutral-600 h-4 w-4 rounded-full flex justify-center items-center"
          style="font-size: 0.66rem">
          {{ index + 1 }}
        </span>
        <a :href="googleMapsUrl" target="_blank">{{ marker.name }}</a>
      </div>
      <p class="text-sm text-neutral-500">{{ marker.formatted_address }}</p>
    </div>
    <button @click.prevent="store.removeMarker(marker)"
      class="self-start text-sm text-neutral-500 hover:text-neutral-800">✕</button>
  </div>
</template>
