<script setup>
import { Sortable } from 'sortablejs-vue3'

import SearchInput from './components/SearchInput.vue'
import MapView from './components/MapView.vue'
import MarkerCard from './components/MarkerCard.vue'

import { useMapStore } from './stores/map'

const store = useMapStore()

const onEnd = (event) => {
  store.moveMarker(event.oldIndex, event.newIndex)
}
</script>

<template>
  <div class="container mx-auto py-4 md:py-10 px-4 flex flex-col min-h-screen">
    <div class="flex-1 grid grid-cols-12 md:gap-x-10 gap-y-8 md:gap-y-0">
      <div class="col-span-12 md:col-span-8">
        <MapView class="h-max" />
      </div>

      <div class="col-span-12 md:col-span-4">
        <SearchInput class="mb-4 md:mb-6" />

        <Sortable :list="store.markers" item-key="place_id" @end="onEnd" class="flex flex-col gap-y-4">
          <template #item="{ element, index }">
            <MarkerCard :marker="element" :index="index" class="draggable" :key="element.id" />
          </template>
        </Sortable>
      </div>
    </div>
  </div>
</template>
