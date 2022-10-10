<template>
  <el-dialog v-model="show" title="Info" width="40%" center>
    <span>
      {{ ex }}
    </span>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useStore } from '@/store'
import { computed, ref, watch } from 'vue'

let show = ref(false)
const store = useStore()
const exception = computed(() => store.exception)
let ex = ref<string>('')
watch(exception, () => {
  if (exception.value != null && exception.value?.length > 0) {
    show.value = true

    ex.value = exception.value
    store.exception = ''
  }
})
</script>
