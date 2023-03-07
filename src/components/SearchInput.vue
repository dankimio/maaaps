<script setup>
import { debounce } from 'lodash'

import { useMapStore } from '../stores/map'

const store = useMapStore()
const maxSearchResults = 8

const onInput = debounce(() => {
  if (!store.query) {
    store.clearSearch()
    return
  }

  store.search()
}, 250)

function onSearchResultClick(result) {
  store.addMarker(result)
  store.clearSearch()
}
</script>

<template>
  <div class="relative flex">
    <input type="text" name="name" id="" class="w-full px-4 h-12 border-none rounded-md bg-neutral-100" @input="onInput"
      v-model="store.query" autocomplete="off" placeholder="Start typing…">

    <div v-if="store.searchResults.length" class="dropdown">
      <div v-for="result in store.searchResults.slice(0, maxSearchResults)" :key="result"
        @click="onSearchResultClick(result)" class="px-4 py-3 flex flex-col hover:bg-neutral-100 cursor-pointer">
        <span class="-mb-0.5">
          {{ result.name }}
        </span>
        <span class="text-sm text-neutral-500">
          {{ result.formatted_address }}
        </span>
      </div>
    </div>

    <div v-if="store.query && store.searchResults.length === 0" class="dropdown">
      <div class="p-5 flex justify-center items-center text-neutral-500 text-sm">
        No results found
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  @apply absolute w-full z-10 rounded-md overflow-hidden border bg-white;

  top: calc(100% + 12px);
}
</style>
