<script setup>
import HelloWorld from './components/HelloWorld.vue'
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
