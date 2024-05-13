<template>
  <div v-if="!productDetail">loading . . .</div>
  <v-card color="" v-else>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="4">
            <v-carousel height="400" hide-delimiters>
              <v-carousel-item
                v-for="i in 2"
                :key="i"
                :src="productDetail?.picture"
                cover
              ></v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col>
            <div class="text-h3 pb-9">{{ productDetail?.name }}</div>
            <div class="text-h4 pb-9">{{ productDetail?.price }} ฿</div>
            <div class="d-flex pb-6">
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    label="จำนวนสินค้า"
                    type="number"
                    v-model="amount"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex">
                  <div class="text-h6 align-self-center pb-5">
                    จำนวนสินค้า {{ productDetail?.amount }} ชิ้น
                  </div>
                </v-col>
              </v-row>
            </div>
            <v-btn class="text-h6" color="green" @click="buyProduct">
              สั่งซื้อ
            </v-btn>
          </v-col>
        </v-row>
        <div class="text-h5">{{ productDetail?.description }}</div>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { ProductCard } from '@/components/productCard/interface'
import { useProductApi } from '@/composables/api'
const route = useRoute()
const productId = route.params.productId as string
const amount = ref(1)
const productDetail = ref<ProductCard | undefined>(undefined)
const productApi = useProductApi()

;(async () => {
  productDetail.value = await productApi.getById(productId)
  if (!productDetail.value) {
    alert('หาไม่เจอ')
    // router.push({ name: 'productDetail', params: { productId: productId } })
    router.push({ name: 'Index' })
  }
})()

function buyProduct() {
  router.push({
    name: 'BuyResult',
    query: { amount: amount.value },
    params: { productId: productDetail.value?.id },
  })
}
</script>
