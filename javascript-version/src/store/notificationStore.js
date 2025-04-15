import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';


export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: useStorage('notifications', [])  // Notificações: { id, message, type }
    }),
    actions: {
        notify(message, type = 'info') {
            if (!this.notifications) {
                this.notifications = []
            }
            this.notifications.push({ id: Date.now(), message, type });
        },
        removeNotification(id) {
            this.notifications = this.notifications.filter(n => n.id !== id);
        }
    }
});
