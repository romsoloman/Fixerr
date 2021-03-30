import { notificationService } from '../services/notification.service'
import { socketService, SOCKET_EVENT_like_ADDED } from '../services/socket.service'

export const notificationStore = {
  state: {
    notifications: null,
  },
  getters: {
    notifications(state) {
      return state.notifications;
    },
  },
  mutations: {
    setNotification(state, { notifications }) {
      state.notifications = notifications;
    },
  },
  actions: {
    async loadNotifications(context) {
      try {
        const notifications = await notificationService.query();
        context.commit({ type: 'setNotification', notifications })

      } catch (err) {
        console.log('notificationtore: Error in loadNotification', err)
        throw err
      }
    },
  }
}
