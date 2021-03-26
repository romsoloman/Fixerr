import Vue from 'vue'
import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { socketStore } from './socket.store.js'
import { reviewStore } from './review.store.js'
import { orderStore } from './order.store.js'
import { gigStore } from './gig.store.js'
import { likeStore } from './like.store.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  modules: {
    userStore,
    // socketStore,
    reviewStore,
    orderStore,
    gigStore,
    likeStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
