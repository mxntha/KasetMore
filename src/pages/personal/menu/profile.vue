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
  import { useRouter } from 'vue-router'
  import { contextPluginSymbol} from '@/plugins/context'
  import { BaseUserInfo } from '@/composables/api/useUserApi'
  import { useUserApi } from '@/composables/api'
  import { ref ,inject} from 'vue'
  const info = inject(contextPluginSymbol)!
  const router = useRouter()
  const userInfoData = ref<BaseUserInfo | null>(null)
  ;(async () => {
    if (info.userInfomation.value == null) {
      alert('ไม่พบข้อมูลผู้ใช้งาน')
      router.push({ path: '/' })
      return
    }
  })()
  function gotoIndex() {
    // infomation.deleteJwt()
    router.push({ name: 'Index' })
  }
  
  </script>
  @/composables/useContext