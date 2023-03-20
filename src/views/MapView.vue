<script setup>
import { ref, watch } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap, Marker } from 'vue3-google-map'

import styles from '@/assets/styles'
import { useMapStore } from '@/stores/map'

import { Sortable } from 'sortablejs-vue3'

import SearchInput from '@/components/SearchInput.vue'
import MarkerCard from '@/components/MarkerCard.vue'

const store = useMapStore()

const onEnd = (event) => {
  store.moveMarker(event.oldIndex, event.newIndex)
}

const mapRef = ref(null)

// Moscow
// const center = { lat: 55.7558, lng: 37.6173 }

// London
const center = { lat: 51.509865, lng: -0.118092 }

const loader = new Loader({
  apiKey: 'AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI',
  version: 'weekly',
  libraries: ['maps', 'places']
})
const mapOptions = {
  apiKey: 'AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI',
  fullscreenControl: false,
  keyboardShortcuts: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoom: 12,
  zoomControl: false,
  center,
  styles
}
const markerOptions = {
  icon: {
    path: 0,
    scale: 7,
    strokeColor: '#444',
    fillColor: '#444',
    fillOpacity: 1
  }
}

watch(() => mapRef.value?.ready, ready => {
  if (!ready) return

  store.map = mapRef.value.map

  loader
    .load()
    .then(google => {
      store.google = google
      store.placesService = new google.maps.places.PlacesService(mapRef.value.map)
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <nav>
      <RouterLink to="/">
        Home
      </RouterLink>
      <RouterLink to="/about">
        About
      </RouterLink>
    </nav>

    <RouterView />

    <div class="flex-1 grid grid-cols-12 md:gap-x-10 gap-y-8 md:gap-y-0">
      <div class="col-span-12 md:col-span-8">
        <GoogleMap
          v-bind="mapOptions"
          ref="mapRef"
          style="width: 100%; height: 100%; min-height: 500px; max-height: 90vh;"
          class="overflow-hidden"
        >
          <Marker
            v-for="(marker, index) in store.markers"
            :key="marker.place_id"
            :options="{
              position: marker.geometry.location, label: { text: `${index + 1}`, color: 'white', fontSize: '11px' }, ...markerOptions
            }"
          />
        </GoogleMap>
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
