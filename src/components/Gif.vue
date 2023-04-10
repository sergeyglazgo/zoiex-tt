<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Something went wrong...</div>
  <div v-else-if="gif">
    <img v-if="!gifID" height="200" :src="gif.url" :alt="gif.title" />
    <div v-else>
      <v-card max-width="500" class="mx-auto">
        <v-img :src="gif.url" class="mb-2" />
        <template v-slot:title>
          <p class="text-wrap">{{ gif.title }}</p>
        </template>
        <router-link :to="`/${gif.username}`" class="text-subtitle-1">
          {{ gif.username }}
        </router-link>
        <v-card-actions>
          <div class="mx-auto">
            <v-btn @click="$router.push('/')">Back</v-btn>
            <v-btn @click="share">Share</v-btn>
          </div>
        </v-card-actions>
      </v-card>
      <Slider />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import { IGif } from "../types"
import Slider from "./Slider.vue"

const props = defineProps<{
  gif?: IGif | null
}>()

const store = useStore()
const route = useRoute()

const isLoading = ref(false)
const isError = ref(false)

const gifID = computed(() => route.params.id)
const gif = computed(() => props.gif || store.getters.getGif)

async function share() {
  const shareData = {
    url: gif.value?.url,
    text: 'Check this Gif'
  }
  if(navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData)
    } catch (e) {
      console.error(e)
    }
  } else {
    alert('Sorry! Your browser does not support Web Share API')
  }
}

async function initData() {
  try {
    isLoading.value = true
    await store.dispatch('loadGif', gifID.value)
  } catch (e) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

watch(() => gifID.value, () => initData())

onMounted(() => {
  if (gifID.value) {
    initData()
  }
})
</script>
