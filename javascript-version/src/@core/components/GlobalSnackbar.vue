<template>
  <v-snackbar v-model="visible" :timeout="5000" location="bottom center" :color="computedBackgroundColor"
    :class="custom - snackbar">
    <v-row align="center" class="fill-width pa-0 ma-0">
      <!-- Ícone à esquerda -->
      <v-icon size="24" class="mr-2">{{ computedIcon }}</v-icon>
      <!-- Mensagem -->
      <span class="white--text">{{ message }}</span>
      <v-spacer></v-spacer>
      <!-- Botão de ação opcional -->
      <v-btn v-if="actionLabel" text @click="handleAction">
        {{ actionLabel }}
      </v-btn>
    </v-row>
  </v-snackbar>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'GlobalSnackbar',
  props: {
    // Inicialmente, o snackbar fica oculto
    modelValue: { type: Boolean, default: false },
    // Mensagem a ser exibida
    message: { type: String, default: 'Mensagem' },
    // Variante: 'info', 'success', 'warning', 'danger'
    variant: { type: String, default: 'info' },
    // Rótulo do botão de ação (opcional)
    actionLabel: { type: String, default: '' },
  },
  emits: ['update:modelValue', 'action'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue)

    // Watch para sincronizar a prop modelValue com a variável interna e log
    watch(() => props.modelValue, (newVal) => {
      console.log('GlobalSnackbar: modelValue mudou para:', newVal)
      visible.value = newVal
    })

    // Mapeamento de variante para cor e ícone
    const variantMapping = {
      info: { color: '#026173', icon: 'mdi-information' },
      success: { color: '#0d581c', icon: 'mdi-check-circle' },
      warning: { color: '#fcbe05', icon: 'mdi-alert' },
      danger: { color: '#8c2323', icon: 'mdi-alert-circle' },
    }

    const computedBackgroundColor = computed(
      () => variantMapping[props.variant]?.color || 'primary'
    )
    const computedIcon = computed(
      () => variantMapping[props.variant]?.icon || 'mdi-information'
    )

    function handleAction() {
      // Emite um evento de ação para que o pai trate o callback
      console.log('GlobalSnackbar: Ação executada')
      emit('action')
      updateVisible(false)
    }

    const updateVisible = (val) => {
      visible.value = val
      emit('update:modelValue', val)
      console.log('GlobalSnackbar: updateVisible ->', val)
    }

    // // Watch para monitorar mudanças internas de "visible"
    // watch(visible, (newVal, oldVal) => {
    //   console.log(`GlobalSnackbar: visible mudou de ${oldVal} para ${newVal}`)
    // })

    return {
      visible,
      computedBackgroundColor,
      computedIcon,
      handleAction,
    }
  },
}
</script>

<style scoped>
.custom-snackbar {
  position: fixed !important;
  bottom: 16px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  /* Usamos apenas para definir dimensões sem interferir no posicionamento */
  width: 344px;
  height: 48px;
  /* Caso necessário, pode forçar o posicionamento, mas a prop location já centraliza */
}
</style>
