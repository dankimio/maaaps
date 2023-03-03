<!-- eslint-disable no-new -->
<script setup>
import SearchInput from './components/SearchInput.vue'
import Map from './components/Map.vue'
import MarkerCard from './components/MarkerCard.vue'

import { useMapStore } from './stores/map'

const store = useMapStore()
</script>

<template>
  <div class="container mx-auto py-10">
    <SearchInput class="mb-8" />

    <div class="grid grid-cols-12 gap-x-8">
      <div class="col-span-8">
        <Map />
      </div>

      <div class="col-span-4">
        <div class="flex flex-col gap-y-5">
          <MarkerCard v-for="marker in store.markers" :key="marker.place_id" :marker="marker" />
        </div>
      </div>
    </div>
  </div>
</template>
