<script setup>
const recentDevices = ref([
  {
    type: 'Novo para voce',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: 'Atividade da conta',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: 'A new browser used to sign in',
    email: true,
    browser: true,
    app: false,
  },
  {
    type: 'Um novo dispositivo esta conectado',
    email: true,
    browser: false,
    app: false,
  },
])

const selectedNotification = ref('Somente quando eu estiver online')
</script>

<template>
  <VCard title="Recent Devices">
    <VCardText>
      Precisamos da permissão do seu navegador para mostrar notificações.
      <a href="javascript:void(0)">Request Permissão</a>
    </VCardText>

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">
            Tipo
          </th>
          <th scope="col">
            EMAIL
          </th>
          <th scope="col">
            NAVEGADOR
          </th>
          <th scope="col">
            Aplicação
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in recentDevices" :key="device.type">
          <td>
            {{ device.type }}
          </td>
          <td>
            <VCheckbox v-model="device.email" />
          </td>
          <td>
            <VCheckbox v-model="device.browser" />
          </td>
          <td>
            <VCheckbox v-model="device.app" />
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />

    <VCardText>
      <VForm @submit.prevent="() => { }">
        <p class="text-base font-weight-medium">
          Quando devemos enviar notificações a você?
        </p>

        <VRow>
          <VCol cols="12" sm="6">
            <VSelect v-model="selectedNotification" mandatory :items="['Only when I\'m online', 'Anytime']" />
          </VCol>
        </VRow>

        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn type="submit">
            Salvar alterações
          </VBtn>
          <VBtn color="secondary" variant="outlined" type="reset">
            Reiniciar
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
