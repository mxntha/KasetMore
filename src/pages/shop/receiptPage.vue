<template>
  <div class="d-flex justify-center">
    <v-card :loading="loading" width="700" height="900" class="ma-0 pa-0">
      <v-card-title class="d-flex justify-end mt-2">
        <v-btn @click="downloadImage" color="primary" v-if="!loading">
          ดาวน์โหลดใบเสร็จ</v-btn
        >
      </v-card-title>
      <v-card-text v-if="transaction != undefined && !loading" class="h-100">
        <div ref="captureElement" class="h-100 pa-4">
          <div class="d-flex">
            <div class="ma-2 pl-2 text-h4">
              <v-img :src="box" alt="Logo" width="80" height="65"></v-img>
            </div>
            <div class="ma-2 text-h4 align-self-center">Kaset More</div>
          </div>
          <div>
            <div class="ma-2 text-h5">ใบเสร็จชำระเงิน</div>
            <div class="d-flex">
              <div class="me-auto ma-2 pa-2">
                เลขที่คำสั่งซื้อ : {{ transaction?.transactionId ?? '' }}
              </div>
              <div class="ma-2 pa-2">วันที่ : {{ receiptdate }}</div>
            </div>
          </div>
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
              <div class="ma-2 text-body-1">
                ที่อยู่ : {{ userBuyer?.address }}
              </div>
              <div class="ma-2 mb-10 text-body-1">
                ติดต่อ : {{ userBuyer?.phoneNumber }}
              </div>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <div class="d-flex ma-3 justify-space-between">
            <div class="mr-16 ml-16">รายการสินค้า</div>
            <div class="mr-8 ml-16">จำนวน</div>
            <div class="mr-5">ราคาต่อ{{ transaction.unit }}</div>
            <div class="mr-5">จำนวนเงิน</div>
          </div>

          <v-divider></v-divider>
          <div class="d-flex ma-3 justify-space-between">
            <div class="text-h6 ml-16 mr-6 text-center">
              {{ productDetail?.productName }}
            </div>
            <div class="text-h6 mr-n16">{{ transaction.amount }}</div>
            <div class="text-h6 mr-n11">{{ transaction.price }}</div>
            <div class="text-h6 mr-10">
              {{ transaction.price * transaction.amount }}
            </div>
          </div>

          <v-divider></v-divider>
          <div class="d-flex flex-row-reverse ma-3">
            <div class="text-body-1">
              ยอดรวม : {{ transaction.price * transaction.amount }} บาท
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions v-if="!loading" class="hidden_print">
        <v-container class="pb-2">
          <v-row class="d-flex justify-center">
            <v-col cols="auto">
              <v-btn
                block
                prepend-icon="mdi-home"
                variant="tonal"
                @click="gotoIndexLogin"
                class="equal-btn"
              >
                หน้าแรก
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                block
                prepend-icon="mdi-clipboard-text"
                @click="gotoPurchase"
                variant="tonal"
                class="equal-btn"
              >
                ประวัติการซื้อ
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import box from '@/assets/box.png'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, nextTick } from 'vue'
import { useTransactionApi, useUserApi, useProductApi } from '@/composables/api'
import { TransectionModel } from '@/composables/api/useTransactionApi'
import { ProductDetailById } from '@/composables/api/interface'
import { BaseUserInfo } from '@/composables/api/useUserApi'
import html2canvas from 'html2canvas'
const captureElement = ref<HTMLDivElement | null>(null)
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
async function downloadImage() {
  if (captureElement.value) {
    const element = captureElement.value
    const canvas = await html2canvas(element)
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `receipt-${
      transaction.value!.transactionId
    }-${new Date().toDateString()}.png`
    link.click()
  }
}
</script>

<style scoped>
.v-card {
  display: flex;
  flex-direction: column;
}

.v-card-actions {
  margin-top: auto;
}

.equal-btn {
  width: 150px; /* ตั้งค่าความกว้างให้เท่ากันตามต้องการ */
}
.hidden_print {
  display: block;
  visibility: visible;
}

@media print {
  .hidden_print {
    display: none;
  }
}
.capture-area {
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}
</style>
