<template>
  <div>
    <header class="d-flex align-center flex-wrap">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Giphy-logo.svg/1280px-Giphy-logo.svg.png"
        alt="logo"
        width="200"
        class="mr-2 mb-1"
      >
      <v-text-field v-model="query" label="Search" class="search" @input="searchChange" />
    </header>

    <p v-if="isLoading">Loading...</p>
    <p v-else-if="isError">Something went wrong...</p>

    <div v-else-if="gifs?.length" class="d-flex flex-wrap justify-space-evenly mb-2">
      <router-link
        v-for="gif in paginatedGifs"
        :key="gif.id"
        :to="`/gifs/${gif.id}`"
      >
        <Gif :gif="gif" />
      </router-link>
      <div class="pagination d-flex justify-center mb-2">
        <v-btn @click="currentPage--" :disabled="currentPage === 0" class="mr-2">&lt;</v-btn>
        <v-btn @click="currentPage++" :disabled="isDisabled">></v-btn>
      </div>
    </div>
    <p v-else>No matches</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from "vuex"
import Gif from "./Gif.vue"

const store = useStore()
const isLoading = ref(false)
const isError = ref(false)
const query = ref('')
const gifs = computed(() => store.getters.getGifs)

function debounce () {
  let timer: ReturnType<typeof setTimeout>
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      initData()
      currentPage.value = 0
    }, 500)
  }
}
const searchChange = debounce()

const PAGE_SIZE = 15;
const currentPage = ref(0)
const isDisabled = computed(() => currentPage.value === Math.ceil(gifs.value.length / PAGE_SIZE)-1)

const paginatedGifs = computed( () => {
  const startIndex = currentPage.value * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  return gifs.value.slice(startIndex, endIndex)
})

async function initData() {
  try {
    isLoading.value = true
    await store.dispatch('loadGifs', query.value ? { loadType: 'search', searchQuery: query.value } : {})
  } catch (e) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => initData())
</script>

<style scoped>
.pagination {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.search {
  min-width: 200px;
}
</style>
