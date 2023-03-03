<!-- eslint-disable no-new -->
<script setup>
import { ref, watch } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap, Marker } from 'vue3-google-map'

import MarkerCard from './components/MarkerCard.vue'
import styles from './assets/styles'
import { useMapStore } from './stores/map'

const store = useMapStore()
const map = ref(null)

const moscow = { lat: 55.7558, lng: 37.6173 }
const loader = new Loader({
  apiKey: 'AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI',
  version: 'weekly',
  libraries: ['places']
})
const mapOptions = {
  apiKey: 'AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI',
  center: moscow,
  zoom: 10,
  streetViewControl: false,
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  keyboardShortcuts: false,
  styles
}
const markerOptions = {
  icon: {
    path: 0,
    scale: 5,
    strokeColor: '#e84a4a'
  }
}

watch(() => map.value?.ready, ready => {
  if (!ready) return

  loader
    .load()
    .then(google => {
      store.google = google
      store.placesService = new google.maps.places.PlacesService(map.value.map)
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div class="container mx-auto py-10">
    <SearchInput class="mb-8" />

    <div class="grid grid-cols-12 gap-x-8">
      <div class="col-span-8">
        <GoogleMap :center="moscow" style="width: 100%; height: 500px" v-bind="mapOptions" ref="map"
          class="overflow-hidden">
          <Marker v-for="marker in markers" :key="marker.place_id"
            :options="{ position: marker.geometry.location, ...markerOptions }" />
        </GoogleMap>
      </div>

      <div class="col-span-4">
        <div class="flex flex-col gap-y-5">
          <MarkerCard v-for="marker in markers" :key="marker.place_id" :marker="marker" />
        </div>
      </div>
    </div>
  </div>
</template>
