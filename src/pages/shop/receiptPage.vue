<template>
  note <br />

  ui จะปรับเเต่งอะไรเพิม่ไหม

  {{ route.params }} {{ transaction }}
  <v-card class="ma-8" height="835" v-if="transaction != undefined">
    <v-card-title class="text-center ma-2">
      <div class="d-flex">
        <div class="ma-2 pl-2 text-h4">
          <v-img :src="box" alt="Logo" width="80" height="65"></v-img>
        </div>
        <div class="ma-2 text-h4 align-self-center">Kaset More</div>
      </div>
      <div class="ma-2 text-h5">ใบเสร็จชำระเงิน</div>
      <div class="d-flex">
        <div class="me-auto ma-2 pa-2">
          เลขที่คำสั่งซื้อ : {{ transaction.transactionId }}
        </div>
        <div class="ma-2 pa-2">วันที่ : {{ receiptdate }}</div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <div class="ma-2 text-h6">ร้านค้าที่ให้บริการ</div>
          <div class="ma-2 text-body-1">
            ชื่อร้านค้า : {{ userSeller?.userName }}
          </div>
          <div class="ma-2 text-body-1">
            ที่อยู่ร้านค้า : {{ userSeller?.address }}
          </div>
          <div class="ma-2 text-body-1">
            ติดต่อ : {{ userSeller?.phoneNumber }}
          </div>
        </v-col>

        <v-col cols="6">
          <div class="ma-2 text-h6">รายละเอียดผู้สั่งซื้อ</div>
          <div class="ma-2 text-body-1">
            ชื่อ-นามสกุล : {{ userBuyer?.name }} {{ userBuyer?.lastName }}
          </div>
          <div class="ma-2 text-body-1">ที่อยู่ : {{ userBuyer?.address }}</div>
          <div class="ma-2 mb-10 text-body-1">
            ติดต่อ : {{ userBuyer?.phoneNumber }}
          </div>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <div>{{ productDetail?.productImages[0] }}</div>
      <div class="text-h4">สินค้า : {{ productDetail?.productName }}</div>
      <div class="d-flex flex-row-reverse">
        จำนวน : {{ transaction.amount }} {{ transaction.unit }}
      </div>
      <div>{{ transaction.amount }} * {{ transaction.price }}</div>

      <v-divider></v-divider>
      <div class="d-flex flex-row-reverse ma-2">
        <div class="text-body-1">ยอดรวม : {{ transaction.price }} ฿</div>
      </div>
    </v-card-text>
    <div class="d-flex justify-end ma-2">
      <div class="mr-3">
        <v-btn block prepend-icon="mdi-home" @click="gotoIndexLogin">
          หน้าแรก
        </v-btn>
      </div>
      <div class="mr-3">
        <v-btn block prepend-icon="mdi-clipboard-text" @click="gotoPurchase">
          ประวัติการซื้อ
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import box from '@/assets/box.png'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useTransactionApi, useUserApi, useProductApi } from '@/composables/api'
import { TransectionModel } from '@/composables/api/useTransactionApi'
import { ProductDetailById } from '@/composables/api/interface'
import { BaseUserInfo } from '@/composables/api/useUserApi'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const transactionApi = useTransactionApi()
const transaction = ref<TransectionModel>()
const receiptId = route.params.receiptId as string
const receiptdate = computed(() => {
  if (transaction.value == undefined) return
  const date = new Date(transaction.value.createDate)
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
})
const userApi = useUserApi()
const userSeller = ref<BaseUserInfo | null>(null)
const userBuyer = ref<BaseUserInfo | null>(null)
const productApi = useProductApi()
const productDetail = ref<ProductDetailById | null>(null)

onMounted(async () => {
  loading.value = true
  transaction.value = await transactionApi.getById(receiptId)
  userSeller.value = await userApi.userByEmail(transaction.value.sellerEmail)
  userBuyer.value = await userApi.userByEmail(transaction.value.buyerEmail)
  productDetail.value = await productApi.getById(
    transaction.value.productId.toString()
  )
  loading.value = false
})

function gotoIndexLogin() {
  router.push({ name: 'Index' })
}
function gotoPurchase() {
  router.push({ name: 'Purchase' })
}
</script>
