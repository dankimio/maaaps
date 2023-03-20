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
    <div>
      <p>
        <!-- use the router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
        <router-link to="/">
          Home
        </router-link>
        <router-link to="/about">
          About
        </router-link>
      </p>
      <router-view />
    </div>
    <div class="flex-1 grid grid-cols-12 md:gap-x-10 gap-y-8 md:gap-y-0">
      <div class="col-span-12 md:col-span-8">
        <MapView style="max-height: 90vh;" />
      </div>

      <div class="col-span-12 md:col-span-4">
        <SearchInput class="mb-4 md:mb-6" />

        <Sortable
          item-key="place_id"
          :list="store.markers"
          :options="{ handle: '.handle' }"
          class="flex flex-col gap-y-4"
          @end="onEnd"
        >
          <template #item="{ element, index }">
            <MarkerCard
              :key="element.id"
              :marker="element"
              :index="index"
              class="draggable"
            />
          </template>
        </Sortable>
      </div>
    </div>
  </div>
</template>
