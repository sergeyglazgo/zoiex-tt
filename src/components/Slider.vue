<template>
  <v-sheet
    class="mx-auto mt-4"
    elevation="8"
    max-width="800"
  >
    <v-slide-group
      class="pa-4"
      show-arrows
    >
      <v-slide-group-item
        v-for="gif in gifs"
        :key="gif.id"
      >
        <v-card
          class="ma-4"
          height="100"
          width="100"
          @click="$router.push(`/gifs/${gif.id}`)"
        >
          <div class="d-flex fill-height align-center justify-center">
            <v-img :src="gif.url" height="200"></v-img>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useStore } from "vuex"

const store = useStore()
const gifs = computed(() => store.getters.getGifs)

onMounted(() => store.dispatch('loadGifs', {}))
</script>

<style>
.v-slide-group__prev::before {
  content: "<";
  font-size: 20px;
}

.v-slide-group__next::after {
  content: ">";
  font-size: 20px;
}
</style>
