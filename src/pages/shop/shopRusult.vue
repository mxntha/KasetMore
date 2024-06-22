<template>
  note <br />
  แก้unit

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
        <div>จำนวน : {{ amount }} {{ productDetail.unit }}</div>
        <div>รวมเป็นเงิน : {{ productDetail.price * parseInt(amount!) }}</div>
        <div class="d-flex flex-row-reverse mb-6">
          <v-btn color="green" @click="buyProduct"> ยืนยันสั่งซื้อ </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useProductApi, useUnitApi } from '@/composables/api'
import { ProductDetailById, UnitApiModel } from '@/composables/api/interface'

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
// if (amount == null || parseInt(amount) <= 0 || amount == undefined) {
//   alert('ไม่มีจำนวนซื้อ')
//   router.push({ name: 'productDetail', params: { productId: productId } })
// }
// const productDetail = computed((): Product | null => null)
// if (productDetail.value == null) {
//   alert('หาไม่เจอ')
//   router.push({ name: 'productDetail', params: { productId: productId } })
// }
// if (parseInt(amount!) > productDetail.value!.amount) {
//   alert('จำนวนซื้อมากเกินไป')
//   router.push({ name: 'productDetail', params: { productId: productId } })
// }
function generateRandomString(length: number) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function buyProduct() {
  const confirmBuy = confirm('ยืนยันการสั่งซื้อ')
  if (confirmBuy) {
    alert('กำลังทำการหักเงิน . . . รอ 2 วิ')
    setTimeout(() => {
      alert('จ่ายเงินสำเร็จ')
      router.push({
        name: 'Receipt',
        params: { receiptId: generateRandomString(16) },
      })
    }, 2000)
  } else {
    alert('ไม่ซื้อเเล้วจะกดมาเพื่อ')
  }
}
</script>
