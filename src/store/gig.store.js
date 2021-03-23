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
    isLoading: false

  },
  getters: {
    gigs(state) {
      return state.gigs
    },
<<<<<<< HEAD
    isLoading(state) {
      return state.isLoading;
=======
    gig(state) {
      return state.gig
>>>>>>> eb916a74f45257c877e7fc496846b431f15911bb
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
<<<<<<< HEAD
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading;
    },
    setGigs(state, { gig }) {
=======
    setGig(state, { gig }) {
>>>>>>> eb916a74f45257c877e7fc496846b431f15911bb
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
      commit({ type: 'setIsLoading', isLoading: true });
      gigService.query(state.filter || undefined)
        .then(gigs => {
          commit({ type: 'setGigs', gigs });
        })
        .catch(err => {
          console.log('Store: Cannot load gigs', err);
          throw new Error('Cannot load gigs');
        })
        .finally(() => commit({ type: 'setIsLoading', isLoading: false }));
    },
    loadGig({ commit }, { userId }) {
      gigService.getByUserId(userId)
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
