<template>
  <v-card :loading="loading">
    <v-card-title>ประวัติการซื้อ</v-card-title>
    <v-divider class="mb-n2"></v-divider>
    <v-card-text v-if="!loading" class="scrollable-content">
      <!-- แสดงข้อมูล -->
      <v-row v-if="purchaseData.length > 0" class="my-1">
        <template
          v-for="transaction in purchaseData"
          :key="transaction.transactionId"
        >
          <v-col cols="12" v-if="transaction.items.length === 0">
            <v-card class="mb-n2 mt-n2" v-if="transaction.productId > 1">
              <v-card-title>
                <div class="d-flex ma-2">
                  <v-icon icon="mdi-store"></v-icon>
                  <div class="pl-2 font-weight-bold user-display">
                    {{ transaction.sellerEmail }}
                  </div>
                  <div class="ml-auto">
                    <v-btn
                      color="grey-lighten-1"
                      @click="goToReceipt(transaction.transactionId)"
                      class="mr-2"
                      >ใบแจ้งยอดชำระ</v-btn
                    >
                    <v-btn
                      color="green-lighten-2"
                      @click="goToProductDetail(transaction.productId)"
                      >ซื้ออีกครั้ง</v-btn
                    >
                  </div>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div class="d-flex align-center ma-3">
                  <div>
                    <v-img
                      :src="getProductImage(transaction.productId)"
                      height="150"
                      width="200"
                    ></v-img>
                  </div>

                  <div class="ml-4 align-self-center">
                    <div class="product-name">
                      {{ getProductName(transaction.productId) }}
                      {{ transaction.productId }}
                    </div>

                    <div class="mt-2 card-description">
                      {{ getProductDescription(transaction.productId) }}
                    </div>
                  </div>
                </div>

                <v-divider></v-divider>

                <div class="d-flex justify-space-between amount-price">
                  <div>
                    จำนวน : {{ transaction.amount }} {{ transaction.unit }}
                  </div>
                  <div class="d-flex flex-row-reverse">
                    รวมการสั่งซื้อ:
                    {{ transaction.price * transaction.amount }} ฿
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" v-else v-for="transactionItem in transaction.items">
            <v-card class="mb-n2 mt-n2">
              <v-card-title>
                <div class="d-flex ma-2">
                  <v-icon icon="mdi-store"></v-icon>
                  <div class="pl-2 font-weight-bold user-display">
                    {{ transactionItem.sellerEmail }}
                  </div>
                  <div class="ml-auto">
                    <v-btn
                      color="grey-lighten-1"
                      @click="goToReceipt(transactionItem.transactionId)"
                      class="mr-2"
                      >ใบแจ้งยอดชำระ</v-btn
                    >
                    <v-btn
                      color="green-lighten-2"
                      @click="goToProductDetail(transactionItem.productId)"
                      >ซื้ออีกครั้ง</v-btn
                    >
                  </div>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div class="d-flex align-center ma-3">
                  <div>
                    <v-img
                      :src="getProductImage(transactionItem.productId)"
                      height="150"
                      width="200"
                    ></v-img>
                  </div>

                  <div class="ml-4 align-self-center">
                    <div class="product-name">
                      {{ getProductName(transactionItem.productId) }}
                      {{ transactionItem.productId }}
                    </div>

                    <div class="mt-2 card-description">
                      {{ getProductDescription(transactionItem.productId) }}
                    </div>
                  </div>
                </div>

                <v-divider></v-divider>

                <div class="d-flex justify-space-between amount-price">
                  <div>
                    จำนวน : {{ transactionItem.amount }}
                    {{ transactionItem.unit }}
                  </div>
                  <div class="d-flex flex-row-reverse">
                    รวมการสั่งซื้อ:
                    {{ transactionItem.price * transactionItem.amount }} ฿
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </template>
      </v-row>
      <!-- ไม่มีข้อมูล -->
      <div class="ma-16" v-else>
        <div class="d-flex justify-space-around">
          <v-icon
            class="mt-16"
            icon="mdi-archive-off"
            size="200"
            color="grey"
          ></v-icon>
        </div>
        <div class="d-flex justify-space-around text-grey">
          ไม่มีข้อมูลสินค้า
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { searchPluginSymbol } from '@/plugins/search'
import router from '@/router'
import {
  useTransactionApi,
  useProductApi,
  useUserApi,
  useUnitApi,
} from '@/composables/api'
import { ProductDetailById, UnitApiModel } from '@/composables/api/interface'
import { onMounted, computed, inject } from 'vue'
import { contextPluginSymbol } from '@/plugins/context'
import { TransectionModel } from '@/composables/api/useTransactionApi'

const info = inject(contextPluginSymbol)!
const route = useRoute()
const purchaseData = ref<TransectionModel[]>([])
const loading = ref(true)
const transactionApi = useTransactionApi()
const productDetails = ref<ProductDetailById[]>([])
const productApi = useProductApi()
const userDisplay = ref<any>(null)
const userApi = useUserApi()
const unitApi = useUnitApi()
const units = ref<UnitApiModel[]>([] as { unitId: number; unitName: string }[])

const getProductDetailById = async (
  id: number
): Promise<ProductDetailById | null> => {
  try {
    return await productApi.getById(id.toString())
  } catch {
    return null
  }
}

const getProductName = (productId: number) => {
  const product = productDetails.value.find(
    (product) => product.productId === productId
  )
  return product ? product.productName : 'ไม่พบข้อมูลสินค้า'
}

const getProductImage = (productId: number) => {
  const product = productDetails.value.find(
    (product) => product.productId === productId
  )
  return product ? product.productImages[0].image : '' // ตั้งค่าตามโครงการ
}

const getProductDescription = (productId: number) => {
  const product = productDetails.value.find(
    (product) => product.productId === productId
  )
  if (product) {
    return product.description.slice(0, 1500) // ตัดข้อความ
  } else {
    return 'ไม่พบข้อมูลสินค้า'
  }
}

const goToProductDetail = (productId: number) => {
  console.log('ไปที่หน้าสินค้าตาม productId:', productId)
  router.push({ name: 'ProductDetail', params: { productId } })
}

const goToReceipt = (receiptId: number) => {
  console.log('ไปที่หน้าใบเสร็จ:', receiptId)
  router.push({ name: 'Receipt', params: { receiptId } })
}

onMounted(async () => {
  try {
    loading.value = true
    purchaseData.value = (
      await transactionApi.getByBuyer(info.userInfomation.value?.email!)!
    ).sort((a, b) => b.transactionId - a.transactionId)

    const sellerEmail = purchaseData.value[0].sellerEmail
    userDisplay.value = await userApi.userByEmail(sellerEmail)
    const productIds = purchaseData.value
      .filter((x) => x.items.length === 0)
      .map((transaction) => transaction.productId)
    purchaseData.value.forEach((x) => {
      x.items.forEach((t) => {
        productIds.push(t.productId)
      })
    })
    const products = await Promise.all(
      productIds.map((id) => getProductDetailById(id))
    )
    productDetails.value = products.filter(
      (product) => product !== null
    ) as ProductDetailById[]
    units.value = await unitApi.getAll()
  } catch (ex) {}
  loading.value = false
})
</script>
<style scoped>
.card-description {
  max-height: 150px; /* ตั้งค่าสูงสุดของข้อความที่ต้องการ */
  overflow: hidden;
  text-overflow: ellipsis; /* แสดง ... เมื่อข้อความเกินความสูงสูงสุด */
  white-space: normal; /* แสดงข้อความทั้งหมด */
  max-width: 1000px;
}

.product-name {
  font-size: 18px; /* ตั้งค่าขนาดตัวอักษรของชื่อสินค้า */
  font-weight: bold; /* ตั้งค่าตัวหนาของชื่อสินค้า */
}

.user-display {
  font-size: 18px; /* ตั้งค่าขนาดตัวอักษรของชื่อสินค้า */
  font-weight: bold; /* ตั้งค่าตัวหนาของชื่อสินค้า */
}

.amount-price {
  font-size: 17px;
}

.scrollable-content {
  max-height: 800px; /* ตั้งค่าความสูงสูงสุดตามที่ต้องการ */
  overflow-y: auto; /* ทำให้สามารถเลื่อนลงได้ */
}
</style>
