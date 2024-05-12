<template>
  <div v-if="userInfoData == null">loading . . .</div>
  <v-card v-else class="ma-8" height="835">
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <v-avatar
              icon="mdi-account-circle"
              color="surface-variant"
              :image="userInfoData.profileUrl"
              size="150"
            ></v-avatar>
          </v-col>
          <v-col class="d-flex text-h6">
            <div class="d-block align-self-center">
              <div class="d-flex pb-8">
                <div class="pl-16 pr-5 text-blue-grey-darken-2">ชื่อ</div>
                <div class="pl-5">{{ userInfoData.name }}</div>
                <div class="pl-12 pr-5 text-blue-grey-darken-2">นามสกุล</div>
                <div class="pl-5">{{ userInfoData.lastName }}</div>
              </div>
              <div class="d-flex ">
              <div class="pl-16 pr-5 text-blue-grey-darken-2">Email</div>
              <div class="pl-5">{{ userInfoData?.email }}</div>
            </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserInfomation } from '@/composables/useInfomation'
import { BaseUserInfo } from '@/composables/api/useUserApi'
import { useUserApi } from '@/composables/api'
import { ref } from 'vue'
const info = useUserInfomation()
const router = useRouter()
const userApi = useUserApi()
const userInfoData = ref<BaseUserInfo | null>(null)
;(async () => {
  if (info.getInfomation.value == null) {
    alert('ไม่พบข้อมูลผู้ใช้งาน')
    router.push({ path: '/' })
    return
  }
  const res = await userApi.getUserInfomation(info.getInfomation.value!.userId)
  if (res == null) {
    alert('ไม่พบข้อมูลผู้ใช้งาน')
    router.push({ path: '/' })
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
