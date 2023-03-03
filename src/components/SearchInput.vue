<script setup>
import { debounce } from 'lodash'

import { useMapStore } from '../stores/map'

const store = useMapStore()

const moscow = { lat: 55.7558, lng: 37.6173 }

const onInput = debounce(() => {
  const request = {
    query: store.query,
    location: moscow
  }

  store.placesService.textSearch(request, (results, status) => {
    if (status === store.google.maps.places.PlacesServiceStatus.OK) {
      store.searchResults = results
    }
  })
}, 500)

function onSearchResultClick(result) {
  store.markers.push(result)
  store.query = ''
  store.searchResults = []
}
</script>

<template>
  <div class="relative flex">
    <input type="text" name="name" id="" class="w-full px-4 h-12 border-none rounded-md bg-neutral-100" @input="onInput"
      v-model="store.query" autocomplete="off" placeholder="Start typing…">

    <div v-if="store.searchResults.length" class="absolute z-10 bg-gray-50 rounded-md overflow-hidden"
      style="top: calc(100% + 12px)">
      <div v-for="result in store.searchResults" :key="result" @click="onSearchResultClick(result)"
        class="px-4 py-3 flex flex-col hover:bg-gray-100 cursor-pointer">
        <span class="-mb-0.5">
          {{ result.name }}
        </span>
        <span class="text-sm text-gray-500">
          {{ result.formatted_address }}
        </span>
      </div>
    </div>
  </div>
</template>
