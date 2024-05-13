<template>
  <div v-if="userInfoData == null">loading . . .</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, inject } from 'vue'
import { useUserApi } from '@/composables/api'

const router = useRouter()
const userInfoData = ref<null>(null)
</script>
