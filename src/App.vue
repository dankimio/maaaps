<script setup>
import { Sortable } from 'sortablejs-vue3'

import SearchInput from './components/SearchInput.vue'
import MapView from './components/MapView.vue'
import MarkerCard from './components/MarkerCard.vue'

import { useMapStore } from './stores/map'

const store = useMapStore()

const moveMarker = (from, to) => {
  const marker = store.markers.splice(from, 1)[0]
  store.markers.splice(to, 0, marker)
}

const onEnd = (event) => {
  moveMarker(event.oldIndex, event.newIndex)
}
</script>

<template>
  <div class="container mx-auto py-12 flex flex-col min-h-screen">
    <div class="flex-1 grid grid-cols-12 gap-x-12">
      <div class="col-span-8">
        <MapView class="h-max" />
      </div>

      <div class="col-span-4">
        <SearchInput class="mb-8" />

        <Sortable :list="store.markers" item-key="place_id" @end="onEnd" class="flex flex-col gap-y-4">
          <template #item="{ element }">
            <MarkerCard :marker="element" class="draggable" :key="element.id" />
          </template>
        </Sortable>
      </div>
    </div>
  </div>
</template>
