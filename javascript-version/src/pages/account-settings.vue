<!-- src/pages/account-settings.vue -->
<script setup>
import { useRoute } from 'vue-router'
import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue'
import AccountSettingsNotification from '@/views/pages/account-settings/AccountSettingsNotification.vue'
import AccountSettingsSecurity from '@/views/pages/account-settings/AccountSettingsSecurity.vue'
import Home from '@/layouts/Home.vue'
import Preferencias from '@/views/pages/account-settings/Preferencias.vue'

const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  {
    title: 'Conta',
    icon: 'ri-group-line',
    tab: 'conta',
  },
  {
    title: 'Seguranca',
    icon: 'ri-lock-line',
    tab: 'seguranca',
  },
  {
    title: 'Notificação',
    icon: 'ri-notification-3-line',
    tab: 'notificacao',
  },
  {
    title: 'Preferencia',
    icon: 'ri-notification-3-line',
    tab: 'preferencia',
  },
]
</script>

<template>
  <div>
    <VTabs v-model="activeTab" show-arrows class="v-tabs-pill">
      <VTab v-for="item in tabs" :key="item.icon" :value="item.tab">
        <VIcon size="20" start :icon="item.icon" />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition" :touch="false">
      <!-- Account -->
      <VWindowItem value="account">
        <AccountSettingsAccount />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <AccountSettingsSecurity />
      </VWindowItem>

      <!-- Notification -->
      <VWindowItem value="notification">
        <AccountSettingsNotification />
      </VWindowItem>

      <!-- Preferencia -->
      <VWindowItem value="preferencia">
        <Preferencias />
      </VWindowItem>
    </VWindow>
  </div>
</template>
