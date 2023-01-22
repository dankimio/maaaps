<!-- eslint-disable no-new -->
<script setup>
import { Loader } from '@googlemaps/js-api-loader'
import styles from './assets/styles'
import { onMounted, ref } from 'vue'
import { debounce } from 'lodash'

const loader = new Loader({
  apiKey: 'AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI',
  version: 'weekly',
  libraries: ['places']
})

const mapOptions = {
  center: { lat: 55.7558, lng: 37.6173 },
  zoom: 10,
  streetViewControl: false,
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  keyboardShortcuts: false,
  styles
}

const query = ref('')
const results = ref([])
const markers = ref([])

let map
let google
let placesService

function onClick(result) {
  new google.maps.Marker({
    position: {
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng()
    },
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 5,
      strokeColor: '#ad3c37'
    },
    map
  })

  query.value = ''
  results.value = []

  markers.value.push('marker')
}

const onInput = debounce(() => {
  const request = {
    query: query.value,
    fields: ['name', 'geometry']
  }

  placesService.textSearch(request, (myResults, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      results.value = myResults
    }

    console.log(myResults)
  })
}, 500)

onMounted(() => {
  loader
    .load()
    .then((myGoogle) => {
      google = myGoogle
      map = new google.maps.Map(document.getElementById('map'), mapOptions)
      placesService = new google.maps.places.PlacesService(map)
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div class="container mx-auto py-10">
    <div class="relative mb-8 flex">
      <input
        type="text" name="name" id="" class=" p-2 h-10 border rounded"
        @input="onInput"
        v-model="query"
        autocomplete="off">

      <div v-if="results" class="absolute z-10 bg-white rounded p-2" style="top: calc(100% + 12px)">
        <div v-for="result in results" :key="result" @click="onClick(result)">
          {{ result.name }}
        </div>

      </div>
      <!-- {{ markers }} -->
    </div>

    <div id="map" style="width: 100%; height: 500px;"></div>
  </div>
</template>
