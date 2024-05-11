<template>
  <v-card height="900">
  <div v-if="userInfoData == null">
  loading . . . 
</div>
 <div v-else class="d-flex text-h6 pt-15 ps-15">
    <v-avatar
      icon="mdi-account-circle"
      color="surface-variant"
      :image="userInfoData.profileUrl"
      size="150"
    ></v-avatar>
    
      <div class="d-flex pt-16">
  <div class="pl-16 pr-5 text-blue-grey-darken-2">ชื่อ </div>
  <div class="pl-5"> {{ userInfoData.name }}</div>
  <div class="pl-12 pr-5 text-blue-grey-darken-2"> นามสกุล </div>
  <div class="pl-5">{{ userInfoData.lastName }}</div>
  <div class="pl-16 text-h6">
  
   
  


</div>
</div>
    

</div>
</v-card>
  
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
