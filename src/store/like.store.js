import { likeService } from '../services/like.service'
import { socketService, SOCKET_EVENT_like_ADDED } from '../services/socket.service'

export const likeStore = {
  state: {
    likes: []
  },
  getters: {
    likes(state) {
      return state.likes;
    },
  },
  mutations: {
    setLikes(state, { likes }) {
      state.likes = likes;
    },
    addLike(state, { like }) {
      state.likes.push(like)
    },
    removeLike(state, { likeId }) {
      state.likes = state.likes.filter(like => like._id !== likeId)
    },
  },
  actions: {
    async addLike(context, { like }) {
      try {
        console.log('like', like);
        console.log('IN ADD LIKE!!!!');
        like = await likeService.add(like)
        console.log('like', like);
        context.commit({ type: 'addlike', like })
        return like;
      } catch (err) {
        console.log('likeStore: Error in addlike', err)
        throw err
      }
    },
    async loadLikes(context) {
      try {
        const likes = await likeService.query();
        context.commit({ type: 'setLikes', likes })
        socketService.off(SOCKET_EVENT_LIKE_ADDED)
        socketService.on(SOCKET_EVENT_LIKE_ADDED, like => {
          context.commit({ type: 'addLike', like })
        })

      } catch (err) {
        console.log('likeStore: Error in loadlikes', err)
        throw err
      }
    },
    async removeLike(context, { likeId }) {
      try {
        await likeService.remove(likeId);
        context.commit({ type: 'removeLike', likeId })
      } catch (err) {
        console.log('likeStore: Error in removeLike', err)
        throw err
      }
    },

  }
}
