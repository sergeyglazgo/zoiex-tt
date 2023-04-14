import { createStore } from 'vuex'
import { IGif, State } from "../types"

const baseURL = 'https://api.giphy.com/v1/gifs/'
const apiKey = '?api_key=NIdGjSkmcCwALhBgvMNJqhi6ORtdywCE'

export const store = createStore<State>({
  state: {
    gifs: null,
    gif: null
  },
  mutations: {
    setGifs(state, payload) {
      state.gifs = payload
    },
    setGif(state, payload) {
      state.gif = payload
    }
  },
  actions: {
    async loadGifs({ commit }, { loadType = 'trending', searchQuery = '' }) {
      let url = baseURL + loadType + apiKey
      url += searchQuery ? `&q=${searchQuery}` : ''

      let { data } = await fetchData(url)

      if (!data.length) {
        url = baseURL + 'search' + apiKey + '&q=no&limit=11'
        const randomIndex = Math.floor(Math.random() * 11)
        data = [(await fetchData(url)).data[randomIndex]]
      }

      const gifs = data.map(mapGifData)

      commit('setGifs', gifs)
    },

    async loadGif({ commit, state }, id: string) {
      const url = baseURL + id + apiKey
      const { data } = await fetchData(url)
      const gif = mapGifData(data)

      commit('setGif', gif)
    }
  },
  getters: {
    getGifs(state) {
      return state.gifs
    },
    getGif(state) {
      return state.gif
    }
  }
})

async function fetchData(url: string) {
  return await fetch(url).then(res => {
    if (res.ok) {
      return res.json()
    }
  }).then(data => data)
}

function mapGifData(gif: any): IGif {
  return {
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    userProfile: gif.user?.profile_url,
    username: gif.username,
    displayName: gif.user?.display_name,
    userAvatar: gif.user?.avatar_url
  }
}
