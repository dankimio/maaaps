import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  // Google
  const google = ref(null)
  const map = ref(null)
  const placesService = ref(null)

  // Map
  const markers = ref([])
  const query = ref('')
  const searchResults = ref([])

  function addMarker(marker) {
    markers.value.push(marker)
  }

  function removeMarker(marker) {
    markers.value = markers.value.filter((m) => m !== marker)
  }

  function moveMarker(from, to) {
    const marker = markers.value.splice(from, 1)[0]
    markers.value.splice(to, 0, marker)
  }

  function clearSearch() {
    query.value = ''
    searchResults.value = []
  }

  return { google, map, placesService, markers, query, searchResults, addMarker, removeMarker, moveMarker, clearSearch }
})
