<template>
  <ul class="notifications-list-container">
    <li
      class="notification-container"
      v-for="notification in notifications"
      :key="notification._id"
    >
      <notification-preview :notification="notification" />
    </li>
  </ul>
</template>


<script>
import notificationPreview from "./notification-preview";
export default {
  computed: {
    notifications() {
      return this.$store.getters.notifications;
    },
  },
  components: {
    notificationPreview,
  },
};
</script>
