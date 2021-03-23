import Vue from 'vue'
import Vuex from 'vuex'
import { gigService } from "../services/gig.service.js";
import { utilService } from '../services/util.service.js';
import { orderStore } from "./order.store.js";

Vue.use(Vuex)

export const gigStore = {
  state: {
    gig: null,
    gigs: null,
    filter: null,
    lastPath: null,
    editChanges: null,

  },
  getters: {
    gigs(state) {
      return state.gigs
    },
    gig(state) {
      return state.gig
    },
    getLastPath(state) {
      return state.lastPath;
    },
    getEditChanges(state) {
      return state.editChanges;
    },
  },
  mutations: {
    setGigs(state, { gigs }) {
      state.gigs = gigs;
    },
    setGig(state, { gig }) {
      state.gig = gig;
    },
    removeGig(state, { gigId }) {
      const idxToRemove = state.gigs.findIndex(gig => {
        return gig._id === gigId;
      })
      state.gigs.splice(idxToRemove, 1);
    },
    addGig(state, { gig }) {
      state.gigs.push(gig);
    },
    updateGig(state, { gig }) {
      const idxToUpdate = state.gigs.findIndex(gigFromArray => {
        return gigFromArray._id === gig._id;
      })
      state.gigs.splice(idxToUpdate, 1, gig);
    },
    updateLastPath(state, { path }) {
      state.lastPath = path;
    },
    keepEditChanges(state, { newEditChanges }) {
      state.editChanges = newEditChanges;
    },
    setFilter(state, { filterBy }) {
      state.filter = filterBy;
    },
  },
  actions: {
    loadGigs({ commit, state }) {
      gigService.query(state.filter || undefined)
        .then(gigs => {
          commit({ type: 'setGigs', gigs });
        })
        .catch(err => {
          console.log('Store: Cannot load gigs', err);
          throw new Error('Cannot load gigs');
        })
    },
    loadGig({ commit }, { userId }) {
      gigService.getById(userId)
        .then(gig => {
          commit({ type: 'setGig', gig });
        })
        .catch(err => {
          console.log('Store: Cannot load gigs', err);
          throw new Error('Cannot load gigs');
        })
    },
    saveGigs(context, { gig }) {
      // gig: support EDIT
      const type = (gig._id) ? 'updateGig' : 'addGig';
      return gigService.save(gig)
        .then(savedGig => {
          console.log('savedGig-store', savedGig);
          context.commit({ type, gig: savedGig })
        })
        .catch(err => {
          console.log('Store: Cannot save gig', err);
          throw new Error('Cannot save gig');
        })
    },
    remove(context, { gigId }) {
      return gigService.remove(gigId)
        .then(() => {
          console.log('afterRemove-store')
          context.commit({ type: 'removeGig', gigId })
        })
        .catch(err => {
          console.log('Store: Cannot remove gig', err);
          throw new Error('Cannot remove gig');
        })
    },
  },
  modules: {
    orderStore
  }
}
