<template>
  <v-card color="grey-lighten-1">
    <v-card-text>
      <div class="d-flex">
        <div class="pr-7 pb-5">
          <v-img
            :aspect-ratio="1"
            class="bg-white"
            :src="productDetail?.picture"
            alt=""
            width="300"
            cover
          ></v-img>
        </div>
        <div>
          <div class="text-h3 pb-9">{{ productDetail?.name }}</div>
          <div class="text-h4 pb-9">{{ productDetail?.price }} ฿</div>
          <div class="d-flex pb-6">
            <v-text-field
              label="จำนวนสินค้า"
              type="number"
              v-model="amount"
            ></v-text-field>
            <div class="text-h6 align-self-center pl-3">
              จำนวนสินค้า {{ productDetail?.amount }} ชิ้น
            </div>
          </div>
          <v-btn class="text-h6" color="green" @click="buyProduct">
            สั่งซื้อ
          </v-btn>
        </div>
      </div>
      <div class="text-h5">{{ productDetail?.description }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { productData } from '@/fakeDb'
import router from '@/router'
const route = useRoute()
const productId = route.params.productId
const amount = ref(1)
const productDetail = computed(() =>
  productData.find((x) => x.id === productId),
)
if (productDetail.value == null) {
  alert('หาไม่เจอ')
  router.push({ name: 'productDetail', params: { productId: productId } })
}
function buyProduct() {
  router.push({
    name: 'BuyResult',
    query: { amount: amount.value },
    params: { productId: productDetail.value?.id },
  })
}
</script>
