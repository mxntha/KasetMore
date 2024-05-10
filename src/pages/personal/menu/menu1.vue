<template>
  <div class="text-h6 pt-15 ps-15">
    <v-avatar
      icon="mdi-account-circle"
      color="surface-variant"
      size="80"
    ></v-avatar>
  </div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

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
