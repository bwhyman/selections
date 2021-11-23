<template>
  <el-dialog v-model="show" title="Info" width="40%" center>
    <span>
      {{ ex }}
    </span>
  </el-dialog>
</template>
<script lang="ts" setup>
import { State } from '@/store'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
let show = ref(false)
const store = useStore<State>()
const exception = computed(() => store.state.exception)
let ex = ref<string>('')
watch(exception, () => {
  if (exception.value != null && exception.value?.length > 0) {
    show.value = true

    ex.value = exception.value
    store.state.exception = ''
  }
})
</script>
