import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  // Google
  const google = ref(null)
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

  function clearSearch() {
    query.value = ''
    searchResults.value = []
  }

  return { google, placesService, markers, query, searchResults, addMarker, removeMarker, clearSearch }
})
