<template>
  <el-row>
    <el-col>
      <el-card :body-style="{ padding: '0px' }">
        <el-row align="middle">
          <el-col :span="6" :xs="24">
            <el-button
              type="danger"
              :icon="Setting"
              @click="showSetting = true"
            >
              {{ user?.name }}
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <router-view />
    </el-col>
  </el-row>

  <el-dialog v-model="showSetting" title="Setting" width="40%" center>
    <el-button
      type="danger"
      :icon="Lock"
      @click="shwoResetPassword"
    ></el-button>
    <br />
    <br />

    <el-button type="danger" :icon="Delete" @click="logout"></el-button>
  </el-dialog>
  <reset />
</template>
<script lang="ts" setup>
import { State } from '@/store'
import { computed, defineAsyncComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { Setting, Lock, Delete } from '@element-plus/icons'
const reset = defineAsyncComponent(() => import('./ResetPassword.vue'))
const store = useStore<State>()
let user = computed(() => store.state.user)

store.dispatch('getInfo')
let logout = () => {
  sessionStorage.clear()
  window.location.href = '/'
}

let showSetting = ref(false)
let shwoResetPassword = () => {
  showSetting.value = false
  store.state.showResetPassword = true
}
</script>
