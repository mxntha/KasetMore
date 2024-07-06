<template>
  <v-card class="h-100">
    <v-card-title>ตรวจสอบการสมัครสมาชิกเกษตรกร</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row
        v-if="sellerInfoData.length > 0"
        style="height: 800px; overflow-y: auto"
      >
        <v-col v-for="i in sellerInfoData" cols="12">
          <v-card height="150" class="card-description">
            <v-row>
              <v-col cols="2">
                <div class="d-flex justify-center ma-4">
                  <v-avatar :image="i.profileUrl" size="100"></v-avatar>
                </div>
              </v-col>
              <v-col cols="8">
                <div class="d-flex">
                  <div class="ma-4">
                    ชื่อ-นามสกุล : {{ i.firstName }}
                    {{ i.lastName }}
                  </div>
                  <div class="ma-4">Email : {{ i.email }}</div>
                </div>
                <div class="d-flex">
                  <div class="mr-4 ml-4">เลขบัตรประชาชน : {{ i.idCard }}</div>
                  <div class="mr-4">เลขหลังบัตรประชาชน : {{ i.laserCode }}</div>
                </div>
                <div class="ma-4">ที่อยู่ : {{ i.address }}</div>
              </v-col>
              <v-col cols="2">
                <div class="mt-2">
                  <v-btn
                    class="text-none font-weight-regular"
                    color="green"
                    prepend-icon="mdi-check-circle"
                    text="ผ่านการตรวจสอบ"
                    variant="outlined"
                    @click="Approve(i.email)"
                  ></v-btn>
                </div>
                <div class="mt-5">
                  <v-btn
                    class="text-none font-weight-regular"
                    color="red"
                    prepend-icon="mdi-close-circle"
                    text="ไม่ผ่านการตรวจสอบ"
                    variant="outlined"
                    @click="Rejected(i.email)"
                  ></v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center mt-16">
          <v-icon icon="mdi-account-off" size="200" class="mt-16"></v-icon>
          <p>ไม่มีข้อมูลบัญชีที่ตรวจสอบ</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import useUserApi, { SellerInfo } from '@/composables/api/useUserApi'
import { ref, inject } from 'vue'
import { contextPluginSymbol } from '@/plugins/context'

const sellerInfoData = ref<SellerInfo[]>([])
const imageUrl = ref('')
const router = useRouter()
const info = inject(contextPluginSymbol)!
const userApi = useUserApi()
;(async () => {
  await GetData()
})()

async function Approve(email: string) {
  console.log(email)
  await userApi.updateVerifyFlag(email, 'Y')
  await GetData()
}

async function Rejected(email: string) {
  console.log(email)
  await userApi.updateVerifyFlag(email, 'N')
  await GetData()
}

async function GetData() {
  sellerInfoData.value = await userApi.userByUserType('Seller', 'P')
}
</script>
<style scoped>
.card-description {
  max-height: 150px; /* ตั้งค่าสูงสุดของข้อความที่ต้องการ */
  overflow: hidden;
  white-space: normal; /* แสดงข้อความทั้งหมด */
  /* max-width: 1000px; */
}
</style>
