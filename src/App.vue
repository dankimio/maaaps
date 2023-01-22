<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { Loader } from '@googlemaps/js-api-loader'
import styles from './assets/styles'
import { ref } from 'vue'

const loader = new Loader({
  apiKey: "AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI",
  version: "weekly",
  libraries: ["places"]
});

const mapOptions = {
  center: { lat: 55.7558, lng: 37.6173 },
  zoom: 10,
  streetViewControl: false,
  zoomControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  keyboardShortcuts: false,
  styles: styles
};

// Promise
loader
  .load()
  .then((google) => {
    new google.maps.Map(document.getElementById("map"), mapOptions);
  })
  .catch((e) => {
    console.log(e);
  });

const query = ref('')
</script>

<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <input type="text" name="name" id="" class="mb-8 p-2 h-10 border rounded" v-model="query">
    {{ query }}
    <div id="map" style="width: 75%; height: 75%;"></div>
  </div>
</template>

<style scoped>

</style>
