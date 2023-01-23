<!-- eslint-disable no-new -->
<script setup>
import { ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap } from 'vue3-google-map'
import styles from './assets/styles'

const moscow = { lat: 55.7558, lng: 37.6173 }
const loader = new Loader({
  apiKey: 'AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI',
  version: 'weekly',
  libraries: ['places']
})
const mapOptions = {
  center: moscow,
  zoom: 10,
  streetViewControl: false,
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  keyboardShortcuts: false,
  styles
}

const apiPromise = loader.load()

const query = ref('')

function onInput() {
  console.log(query.value)
}
</script>

<template>
  <div class="container mx-auto py-10 grid grid-cols-12">
    <div class="col-span-8">
      <div class="relative mb-8 flex">
        <input
          type="text" name="name" id="" class=" p-2 h-10 border rounded"
          @input="onInput"
          v-model="query"
          autocomplete="off">

        <!-- <div v-if="results" class="absolute z-10 bg-white rounded p-2" style="top: calc(100% + 12px)">
          <div v-for="result in results" :key="result" @click="onClick(result)">
            {{ result.name }}
          </div>
        </div> -->
      </div>

      <GoogleMap
        :apiPromise="apiPromise"
        :center="moscow"
        style="width: 100%; height: 500px"
        v-bind="mapOptions"
      >
      </GoogleMap>
    </div>
  </div>
</template>
