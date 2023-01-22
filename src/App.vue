<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: "AIzaSyDjyIM1XPwAW252iSF9AKQ9bUTwwzMtrLI",
  version: "weekly",
  libraries: ["places"]
});

const mapOptions = {
  center: {
    lat: 0,
    lng: 0
  },
  zoom: 4
};

// Promise
loader
  .load()
  .then((google) => {
    new google.maps.Map(document.getElementById("map"), mapOptions);
  })
  .catch(e => {
    // do something
  });
</script>

<template>
  <HelloWorld msg="Hello, world" />

  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <input type="text" name="name" id="" class="mb-8 p-2 h-10 border rounded">
    <div id="map" style="width: 75%; height: 75%;"></div>
  </div>
</template>

<style scoped>

</style>
