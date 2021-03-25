<template>
  <ul class="notifications-list-container">
    <li class="notification-container" v-for="like in likes" :key="like._id">
      <notification-preview :like="like" />
    </li>
  </ul>
</template>


<script>
import notificationPreview from "./notification-preview";
export default {
  props: {
    likes: Array,
  },
  methods: {},
  components: {
    notificationPreview,
  },
};
</script>
