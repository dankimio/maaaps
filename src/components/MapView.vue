<script setup>
import { ref, watch } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap, Marker } from 'vue3-google-map'

import styles from '../assets/styles'
import { useMapStore } from '../stores/map'

const store = useMapStore()
const mapRef = ref(null)

const center = { lat: 55.7558, lng: 37.6173 }
const loader = new Loader({
  apiKey: 'AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI',
  version: 'weekly',
  libraries: ['maps', 'places']
})
const mapOptions = {
  apiKey: 'AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI',
  center,
  zoom: 12,
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
    scale: 6,
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
  <GoogleMap style="width: 100%; height: 100%; min-height: 500px;" v-bind="mapOptions" ref="mapRef"
    class="overflow-hidden">
    <Marker v-for="(marker, index) in store.markers" :key="marker.place_id" :options="{
      position: marker.geometry.location, label: { text: `${index + 1}`, color: 'white', fontSize: '11px' }, ...markerOptions
    }" />
  </GoogleMap>
</template>
