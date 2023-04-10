import { createRouter, createWebHashHistory } from 'vue-router'
import GifList from '../components/GifList.vue'
import Gif from '../components/Gif.vue'
import User from '../components/User.vue'

const routes = [
  { path: '/', redirect: '/gifs' },
  { path: '/gifs', component: GifList },
  { path: '/gifs/:id', component: Gif },
  { path: '/:username', component: User }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
