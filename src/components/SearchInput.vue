<script setup>
import { debounce } from 'lodash'

import { useMapStore } from '../stores/map'

const store = useMapStore()

const onInput = debounce(() => {
  if (!store.query) {
    store.searchResults = []
    return
  }

  store.search()
}, 500)

function onSearchResultClick(result) {
  store.addMarker(result)
  store.clearSearch()
}
</script>

<template>
  <div class="relative flex">
    <input type="text" name="name" id="" class="w-full px-4 h-12 border-none rounded-md bg-neutral-100" @input="onInput"
      v-model="store.query" autocomplete="off" placeholder="Start typing…">

    <div v-if="store.searchResults.length" class="absolute w-full shadow-lg z-10 bg-neutral-50 rounded-md overflow-hidden"
      style="top: calc(100% + 12px)">
      <div v-for="result in store.searchResults" :key="result" @click="onSearchResultClick(result)"
        class="px-4 py-3 flex flex-col hover:bg-neutral-100 cursor-pointer">
        <span class="-mb-0.5">
          {{ result.name }}
        </span>
        <span class="text-sm text-neutral-500">
          {{ result.formatted_address }}
        </span>
      </div>
    </div>
  </div>
</template>
