<template>
  <v-card :loading="loading" class="mt-4">
    <v-card-title class="font-weight-black">ข้อมูลตะกร้า</v-card-title>
    <v-card-text>
      <div v-for="cart in cart.getCart">
        <ProductCardvue
          class="w-100"
          :ProductData="getProduct(cart)"
          :disPlayOnly="true"
        ></ProductCardvue>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="payment"> ชำระเงิน </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {
  Product,
  useProductApi,
  useTransactionApi,
  useUnitApi,
} from '@/composables/api'
import { cartPluginSymbol } from '@/plugins/cart'
import ProductCardvue from '@/components/productCard/productcard.vue'

import { onMounted, ref } from 'vue'
import { inject } from 'vue'
import { ProductCard } from '@/components/productCard/interface'
import {
  ItemTransectionInsert,
  TransectionItemInsert,
  UnitApiModel,
} from '@/composables/api/interface'
import { contextPluginSymbol } from '@/plugins/context'
import { useRouter } from 'vue-router'
const cart = inject(cartPluginSymbol)!
const productApi = useProductApi()
const products = ref<Product[]>([])
const loading = ref(true)
const transection = useTransactionApi()
function getProduct(product: Product): Product {
  const _product = products.value.find((x) => x.productId == product.productId)
  return {
    ..._product,
    amount: product.amount,
  } as Product
}
const units = ref<UnitApiModel[]>([])
const info = inject(contextPluginSymbol)!
const router = useRouter()
onMounted(async () => {
  if (cart.getCart.length == 0) {
    alert('ไม่มีสินค้าให้จ่ายเงิน')
    router.push({ name: 'Index' })
  }
  loading.value = true
  products.value = await productApi.getAll()
  units.value = await useUnitApi().getAll()
  loading.value = false
})
async function payment() {
  // dialog.value = false
  const payload: TransectionItemInsert = {
    BuyerEmail: info.userInfomation.value!.email,
    items: cart.getCart.map<ItemTransectionInsert>((x) => {
      const product = getProduct(x)
      return {
        Amount: parseInt(`${x.amount}`),
        Price: product.price,
        ProductId: parseInt(`${product.productId}`),
        SellerEmail: product.userEmail,
        Unit: units.value.find((x) => `${x.unitId}` == product.unitId)
          ?.unitName as string,
      } as ItemTransectionInsert
    }),
  }
  try {
    const id = await transection.createTransactionByCart(payload)
    localStorage.removeItem('cart')
    cart.reset()
    router.push({ name: 'Receipt', params: { receiptId: id } })
  } catch (ex) {
    alert(ex)
  }
}
</script>
