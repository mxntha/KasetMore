<template>
  <v-card :loading="!productDetail" color="">
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
            <v-container>
              <v-row>
                <v-col cols="2" class="align-self-center">ราคา</v-col>
                <v-col class="align-self-center"
                  ><div class="text-h4">
                    {{ productDetail?.price }} ฿
                  </div></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="2" class="align-self-center">จำนวน</v-col>
                <v-col class="align-self-center">
                  <v-row>
                    <v-col xxl="2" xl="3" lg="3" md="5" sm="6">
                      <v-text-field
                        density="compact"
                        label="จำนวนสินค้า"
                        type="number"
                        v-model="amount"
                      >
                        <template v-slot:append>
                          <v-icon color="red" class="cursor-pointer">
                            mdi-plus
                          </v-icon>
                        </template>
                        <template v-slot:prepend>
                          <v-icon color="green" class="cursor-pointer">
                            mdi-minus
                          </v-icon>
                        </template></v-text-field
                      >
                    </v-col>
                    <v-col class="d-flex">
                      <div class="text-h6 align-self-center pb-5">
                        จำนวนสินค้า {{ productDetail?.amount }} ชิ้น
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <div class="d-flex">
              <v-btn class="text-h6" color="green" @click="buyProduct">
                สั่งซื้อ
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <v-card :loading="!productDetail" class="mt-4">
    <v-card-title>รายละเอียดสินค้า</v-card-title>
    <v-card-text>
      <div class="text-h5">{{ productDetail?.description }}</div>
    </v-card-text>
  </v-card>
  <v-card :loading="!productDetail" class="mt-4">
    <v-card-title>ข้อมูลร้านค้า</v-card-title>
    <v-card-text>
      <div class="text-h5">เจ๊บีทุเรียนซิ่ง</div>
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
