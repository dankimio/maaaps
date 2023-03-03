<script setup>
import { debounce } from 'lodash'

import { useMapStore } from './stores/map'

const store = useMapStore()

const onInput = debounce(() => {
  const request = {
    query: query.value,
    location: moscow
  }

  placesService.textSearch(request, (_results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      searchResults.value = _results
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
    <input type="text" name="name" id="" class="p-2 h-10 border rounded border-neutral-300" @input="onInput"
      v-model="query" autocomplete="off">

    <div v-if="searchResults.length" class="absolute z-10 bg-white rounded p-2" style="top: calc(100% + 12px)">
      <div v-for="result in searchResults" :key="result" @click="onSearchResultClick(result)">
        {{ result.name }}
      </div>
    </div>
  </div>
</template>
