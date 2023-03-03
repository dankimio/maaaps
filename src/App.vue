<script setup>
import SearchInput from './components/SearchInput.vue'
import MapView from './components/MapView.vue'
import MarkerCard from './components/MarkerCard.vue'

import { useMapStore } from './stores/map'

const store = useMapStore()
</script>

<template>
  <div class="container mx-auto py-10 flex flex-col min-h-screen">
    <SearchInput class="mb-8" />

    <div class="flex-1 grid grid-cols-12 gap-x-8">
      <div class="col-span-8">
        <MapView class="h-max" />
      </div>

      <div class="col-span-4">
        <div class="flex flex-col gap-y-5">
          <MarkerCard v-for="marker in store.markers" :key="marker.place_id" :marker="marker" />
        </div>
      </div>
    </div>
  </div>
</template>
