import { defineStore, ref } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const markers = ref([])

  function addMarker(marker) {
    markers.value.push(marker)
  }

  function removeMarker(marker) {
    markers.value = markers.value.filter((m) => m !== marker)
  }
})
