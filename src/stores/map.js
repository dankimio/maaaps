import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { placesCollection } from '../firebase'

const maxZoom = 15

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
  const isEmpty = computed(() => !markers.value.length)

  // Search
  const query = ref('')
  const searchResults = ref([])
  const loading = ref(false)

  // Places
  const places = ref([])

  function seed() {
    const queries = [
      { query: 'veladora', fields: ['place_id', 'name', 'geometry', 'formatted_address', 'photos'] },
      { query: 'делай культуру', fields: ['place_id', 'name', 'geometry', 'formatted_address', 'photos'] }
    ]

    queries.forEach(query => {
      placesService.value.findPlaceFromQuery(query, (results, status) => {
        if (status !== 'OK') { console.log(status) }

        addMarker(results[0])
      })
    })
  }

  function search() {
    const request = {
      query: query.value
    }

    if (markers.value.length === 1) {
      request.location = markers.value[0].geometry.location
      request.radius = '25000'
    } else if (markers.value.length >= 2) {
      request.location = bounds.value.getCenter()
      request.radius = '25000'
    }

    placesService.value.textSearch(request, (results, status) => {
      loading.value = false

      if (status === google.value.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        searchResults.value = []
        return
      }

      if (status === google.value.maps.places.PlacesServiceStatus.OK) {
        searchResults.value = results
      }
    })
  }

  function addPlace(marker) {
    places.value.push({
      id: marker.place_id,
      name: marker.name,
      marker
    })
  }

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
    loading.value = false
    query.value = ''
    searchResults.value = []
  }

  function fitBounds() {
    if (!markers.value.length) { return }

    if (markers.value.length === 1) {
      map.value.setCenter(markers.value[0].geometry.location)
      map.value.setZoom(maxZoom)
      return
    }

    map.value.fitBounds(bounds.value, 128)

    if (map.value.getZoom() > maxZoom) {
      map.value.setZoom(maxZoom)
    }
  }

  return {
    addMarker,
    bounds,
    clearSearch,
    isEmpty,
    fitBounds,
    google,
    loading,
    map,
    markers,
    moveMarker,
    placesService,
    query,
    removeMarker,
    search,
    searchResults,
    seed
  }
})
