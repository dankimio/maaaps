import { defineStore, ref } from 'pinia'

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

  return { markers, query, searchResults, addMarker, removeMarker }
})
