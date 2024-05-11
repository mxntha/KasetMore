<template>
  <div v-if="userInfoData == null">
  loading . . . 
</div>
  <div v-else class="text-h6 pt-15 ps-15">
    <v-avatar
      icon="mdi-account-circle"
      color="surface-variant"
      :image="userInfoData.profileUrl"
      size="80"
    ></v-avatar>
    {{ info.getInfomation.value }}
    {{ userInfoData}}
   
    
    <img :src="userInfoData.profileUrl" width="800">
  </div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserInfomation } from '@/composables/useInfomation'
import { BaseUserInfo } from '@/composables/api/useUserApi';
import { useUserApi } from '@/composables/api';
import { ref } from 'vue';
const info = useUserInfomation()
const router = useRouter()
const userApi = useUserApi()
const userInfoData = ref<BaseUserInfo|null>(null)
;(async()=>{
  if(info.getInfomation.value == null){
    alert('ไม่พบข้อมูลผู้ใช้งาน')
    router.push({path:'/'})
    return 
  }
  const res = await userApi.getUserInfomation(info.getInfomation.value!.userId)
  if(res==null){
    alert('ไม่พบข้อมูลผู้ใช้งาน')
    router.push({path:'/'})
    return 
  }
  userInfoData.value = res
})()
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
