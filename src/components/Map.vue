<script setup>
import { ref, watch } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap, Marker } from 'vue3-google-map'

import styles from '../assets/styles'
import { useMapStore } from '../stores/map'

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
    scale: 4,
    strokeColor: '#e53c37',
    fillColor: '#e53c37',
    fillOpacity: 1
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
  <GoogleMap :center="moscow" style="width: 100%; height: 600px" v-bind="mapOptions" ref="map" class="overflow-hidden">
    <Marker v-for="marker in store.markers" :key="marker.place_id"
      :options="{ position: marker.geometry.location, ...markerOptions }" />
  </GoogleMap>
</template>
