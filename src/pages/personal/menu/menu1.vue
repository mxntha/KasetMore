<template>
  <div class="text-h6 pt-15 ps-15">
    <v-avatar
      icon="mdi-account-circle"
      color="surface-variant"
      size="80"
    ></v-avatar>
    {{ info.getInfomation.value }}
  </div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserInfomation } from '@/composables/useInfomation'
const info = useUserInfomation()

const router = useRouter()

function gotoIndex() {
  router.push({ path: '/' })
  localStorage.removeItem('login')
  window.location.reload()
}
function gotoregisterFarmer() {
  router.push({ path: '/registerFarmer' })
}
function gotoaccount() {
  router.push({ path: '/account' })
}
</script>
