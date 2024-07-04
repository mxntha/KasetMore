<template>
  <div class="d-flex justify-center" v-if="productDetail != null">
    <v-card class="ma-12" color="white" height="660" width="700">
      <div class="d-flex justify-center">
        <v-img
          height="500"
          width="500"
          :src="productDetail.productImages[0].image"
          alt=""
        ></v-img>
      </div>

      <div class="ma-6">
        <div class="text-h4">
          {{ productDetail.productName }}
        </div>
        <div>
          จำนวน : {{ amount }}
          {{ unitName }}
        </div>
        <div>รวมเป็นเงิน : {{ productDetail.price * parseInt(amount!) }} ฿</div>
        <div class="d-flex flex-row-reverse mb-6">
          <v-btn color="green" @click="dialog = true" class="ml-3">
            ยืนยันสั่งซื้อ
          </v-btn>

          <v-btn color="grey" @click="router.go(-1)">ยกเลิก</v-btn>
        </div>
      </div>
    </v-card>
  </div>

  <!-- Dialog การชำระเงิน-->
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="headline">ยืนยันการสั่งซื้อ</v-card-title>
      <v-card-text>คุณต้องการยืนยันการสั่งซื้อสินค้าหรือไม่?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="handleConfirm">ยืนยัน</v-btn>
        <v-btn color="grey" @click="dialog = false">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- <v-dialog v-model="processingDialog" max-width="400">
    <v-card>
      <v-card-text>กำลังทำการหักเงิน . . . รอ 2 วิ</v-card-text>
    </v-card>
  </v-dialog> -->

  <v-dialog v-model="successDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">จ่ายเงินสำเร็จ</v-card-title>
      <v-card-text>การชำระเงินของคุณเสร็จสมบูรณ์</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="goToReceipt">ตกลง</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useProductApi, useTransactionApi, useUnitApi } from '@/composables/api'
import { ProductDetailById, UnitApiModel } from '@/composables/api/interface'
import { contextPluginSymbol } from '@/plugins/context'
const info = inject(contextPluginSymbol)!

const route = useRoute()
const productIdParam = route.params.productId
const amountQuery = route.query.amount
const productId = Array.isArray(productIdParam)
  ? productIdParam[0]
  : productIdParam
const amount = Array.isArray(amountQuery) ? amountQuery[0] : amountQuery
const loading = ref(true)
const productApi = useProductApi()
const productDetail = ref<ProductDetailById | null>(null)
const unitApi = useUnitApi()
const units = ref<UnitApiModel[]>([])
const dialog = ref(false)
// const processingDialog = ref(false)
const successDialog = ref(false)
const transection = useTransactionApi()
const receiptId = ref<number | null>(null)

const unitName = computed(() => {
  if (productDetail.value && units.value.length) {
    const unit = units.value.find(
      (u) => `${u.unitId}` == productDetail.value!.unit
    )
    return unit ? unit.unitName : 'ไม่พบหน่วย'
  }
  return 'ไม่พบหน่วย'
})

onMounted(async () => {
  loading.value = true

  try {
    productDetail.value = await productApi.getById(productId)
    units.value = await unitApi.getAll()
    if (productDetail.value === null) {
      alert('ไม่พบสินค้า')
      router.push({ name: 'productList' })
    } else if (amount == null || parseInt(amount) <= 0) {
      alert('กรุณาระบุจำนวนที่ต้องการซื้อ')
      router.push({ name: 'productDetail', params: { productId: productId } })
    } else if (parseInt(amount) > productDetail.value.amount) {
      alert('จำนวนซื้อมากเกินไป')
      router.push({ name: 'productDetail', params: { productId: productId } })
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error)
  } finally {
    loading.value = false
  }
})

function generateRandomString(length: number) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

async function handleConfirm() {
  dialog.value = false
  // processingDialog.value = true
  receiptId.value = (
    await transection.createTransaction([
      {
        amount: parseInt(`${amount}`),
        buyerEmail: info.userInfomation.value!.email,
        price: productDetail.value!.price,
        productId: productDetail.value!.productId,
        sellerEmail: productDetail.value!.userEmail,
        unit: units.value.find(
          (x) => `${x.unitId}` == productDetail.value!.unit
        )?.unitName as string,
        // TransactionId: 1, // ไม่ควรส่ง
        createDate: new Date(), //  ไม่ควรส่ง
      },
    ])
  )[0]

  // processingDialog.value = false
  successDialog.value = true
}

function goToReceipt() {
  successDialog.value = false
  router.push({
    name: 'Receipt',
    params: { receiptId: receiptId.value },
  })
}
</script>
