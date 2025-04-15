<template>
  <div class="notifications">
    <div v-for="notif in notificationStore.notifications" :key="notif.id" class="notification" :class="notif.type">
      {{ notif.message }}
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '@/store/notificationStore';
const notificationStore = useNotificationStore();
</script>

<style scoped>
.notifications {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 250px;
}

.notification {
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  color: #fff;
}

.notification.info {
  background: #2196F3;
}

.notification.success {
  background: #4CAF50;
}

.notification.error {
  background: #F44336;
}
</style>
