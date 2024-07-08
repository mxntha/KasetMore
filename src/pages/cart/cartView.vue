<template>
  <v-card :loading="loading" class="mt-4">
    <v-card-title class="font-weight-black">ข้อมูลตะกร้า</v-card-title>
    <v-card-text>
      <div v-for="_cart in cart.getCart">
        <ProductCardvue
          class="w-100"
          :ProductData="getProduct(_cart)"
          :disPlayOnly="true"
        ></ProductCardvue>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Product, useProductApi } from '@/composables/api'
import { cartPluginSymbol } from '@/plugins/cart'
import ProductCardvue from '@/components/productCard/productcard.vue'

import { onMounted, ref } from 'vue'
import { inject } from 'vue'
import { ProductCard } from '@/components/productCard/interface'
const cart = inject(cartPluginSymbol)!
const productApi = useProductApi()
const products = ref<Product[]>([])
const loading = ref(true)
function getProduct(product: Product): ProductCard {
  const _product = products.value.find((x) => x.productId == product.productId)
  return {
    ..._product,
    amount: product.amount,
  } as ProductCard
}
onMounted(async () => {
  loading.value = true
  products.value = await productApi.getAll()

  loading.value = false
})
</script>
