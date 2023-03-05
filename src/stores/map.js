import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMapStore = defineStore('map', () => {
  // Google
  const google = ref(null)
  const map = ref(null)
  const placesService = ref(null)

  // Map
  const markers = ref([])
  const bounds = computed(() => {
    const latLngBounds = new google.value.maps.LatLngBounds()

    markers.value.forEach(marker => {
      const latLng = new google.value.maps.LatLng(marker.geometry.location.lat(), marker.geometry.location.lng())
      latLngBounds.extend(latLng)
    })

    return latLngBounds
  })

  // Search
  const query = ref('')
  const searchResults = ref([])

  function addMarker(marker) {
    markers.value.push(marker)
    fitBounds()
  }

  function removeMarker(marker) {
    markers.value = markers.value.filter((m) => m !== marker)
    fitBounds()
  }

  function moveMarker(from, to) {
    const marker = markers.value.splice(from, 1)[0]
    markers.value.splice(to, 0, marker)
  }

  function clearSearch() {
    query.value = ''
    searchResults.value = []
  }

  function fitBounds() {
    if (!markers.value.length) { return }

    map.value.fitBounds(bounds.value)
  }

  return {
    google,
    map,
    placesService,
    markers,
    bounds,
    query,
    searchResults,
    addMarker,
    removeMarker,
    moveMarker,
    clearSearch
  }
})
