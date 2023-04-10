<template>
  <v-card max-width="500" class="mx-auto">
    <template v-slot:title>
        <v-img
          height="16"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Giphy-logo.svg/1280px-Giphy-logo.svg.png"
          class="mb-2"
        />
        <p>{{ gif.displayName }}</p>
    </template>
    <v-img height="200" :src="gif.userAvatar" class="mb-2" />
    <a :href="gif.userProfile" target="_blank">{{ gif.userProfile }}</a>
    <v-card-actions>
      <v-btn class="mx-auto" @click="$router.back">Back</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useStore } from "vuex"

const store = useStore()
const gif = store.getters.getGif
</script>
