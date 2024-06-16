<template>
  <v-card class="h-100">
    note หากไม่มีข้อมูลเลยจะเเสดงหน้ายังไง <br />
    หลังจากกดปุ่ม ต่างๆในหน้านี้จะเกิดอะไรขึ้้นบ้าง <br />
    &nbsp; หากกดปุ่มเเล้วเกิด error จะต้องเเสดงอะไรบอกผู้ใช้่ไหม<br />
    หากกดเเล้วข้อมูลจะหายไปไหม ต้องดึงข้อมูลใหม่ไหม <br />
    ปุ่มกดได้่ทุกอันไหม
    <v-card-title>ตรวจสอบการสมัครสมาชิกเกษตรกร</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row style="height: 800px; overflow-y: auto">
        <v-col v-for="i in sellerInfoData" cols="12">
          <v-card height="150">
            <v-row>
              <v-col cols="2">
                <div class="d-flex justify-center ma-4">
                  <v-avatar
                    :image="sellerInfoData?.profileUrl"
                    size="100"
                  ></v-avatar>
                </div>
              </v-col>
              <v-col cols="8">
                <div class="d-flex">
                  <div class="ma-4">
                    ชื่อ-นามสกุล : {{ sellerInfoData?.firstName }}
                    {{ sellerInfoData?.lastName }}
                  </div>
                  <div class="ma-4">Email : {{ sellerInfoData?.email }}</div>
                </div>
                <div class="d-flex">
                  <div class="mr-4 ml-4">
                    เลขบัตรประชาชน : {{ sellerInfoData?.idCard }}
                  </div>
                  <div class="mr-4">
                    เลขหลังบัตรประชาชน : {{ sellerInfoData?.laserCode }}
                  </div>
                </div>
                <div class="ma-4">ที่อยู่ : {{ sellerInfoData?.address }}</div>
              </v-col>
              <v-col cols="2">
                <div class="mt-2">
                  <v-btn
                    class="text-none font-weight-regular"
                    color="green"
                    prepend-icon="mdi-check-circle"
                    text="ผ่านการตรวจสอบ"
                    variant="outlined"
                  ></v-btn>
                </div>
                <div class="mt-5">
                  <v-btn
                    class="text-none font-weight-regular"
                    color="red"
                    prepend-icon="mdi-close-circle"
                    text="ไม่ผ่านการตรวจสอบ"
                    variant="outlined"
                  ></v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
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

const sellerInfoData = ref<SellerInfo | null>(null)
const imageUrl = ref('')
const router = useRouter()
const info = inject(contextPluginSymbol)!
const userApi = useUserApi()
;(async () => {
  const userType = sellerInfoData.value?.userType || 'Seller'
  const statusType = sellerInfoData.value?.statusType || 'P'

  sellerInfoData.value = (await userApi.userByUserType(
    userType,
    statusType
  )) || {
    email: '',
    firstName: '',
    lastName: '',
    profileUrl: '',
    userType: '',
    address: '',
    displayName: '',
    password: '',
    statusType: '',
    laserCode: '',
    phoneNumber: '',
    idCard: '',
    createBy: '',
    createDate: '',
    updateBy: '',
    updateDate: '',
    products: [],
  }
})()
</script>
