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
    <input type="text" name="name" id="" class="px-3 py-2 h-10 border rounded border-neutral-300" @input="onInput"
      v-model="store.query" autocomplete="off">

    <div v-if="store.searchResults.length" class="absolute z-10 bg-white rounded p-2" style="top: calc(100% + 12px)">
      <div v-for="result in store.searchResults" :key="result" @click="onSearchResultClick(result)">
        {{ result.name }}
      </div>
    </div>
  </div>
</template>
