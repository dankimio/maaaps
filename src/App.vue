<!-- eslint-disable no-new -->
<script setup>
import { ref, watch } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap, Marker } from 'vue3-google-map'
import { debounce } from 'lodash'
import MarkerCard from './components/MarkerCard.vue'
import styles from './assets/styles'

const query = ref('')
const map = ref(null)
const searchResults = ref([])
const markers = ref([])

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
    strokeColor: '#ad3c37'
  }
}

let placesService
let google

watch(() => map.value?.ready, ready => {
  if (!ready) return

  loader
    .load()
    .then(_google => {
      google = _google
      placesService = new google.maps.places.PlacesService(map.value.map)
    })
    .catch((error) => {
      console.log(error)
    })
})

function onClick(result) {
  markers.value.push(result)
  query.value = ''
  searchResults.value = []
}

const onInput = debounce(() => {
  const request = {
    query: query.value,
    location: moscow
  }

  placesService.textSearch(request, (_results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      searchResults.value = _results
    }
  })
}, 500)
</script>

<template>
  <div class="container mx-auto py-10">
    <div class="mb-8 relative flex">
      <input type="text" name="name" id="" class="p-2 h-10 border rounded" @input="onInput" v-model="query"
      autocomplete="off">

      <div v-if="searchResults.length" class="absolute z-10 bg-white rounded p-2" style="top: calc(100% + 12px)">
        <div v-for="result in searchResults" :key="result" @click="onClick(result)">
          {{ result.name }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-x-8">
      <div class="col-span-8">

        <GoogleMap :center="moscow" style="width: 100%; height: 500px" v-bind="mapOptions" ref="map">
          <Marker v-for="marker in markers" :key="marker.place_id"
            :options="{ position: marker.geometry.location, ...markerOptions }" />
        </GoogleMap>
      </div>

      <div class="col-span-4">
        <MarkerCard v-for="marker in markers" :key="marker.place_id" :marker="marker" />
      </div>
    </div>
  </div>
</template>
