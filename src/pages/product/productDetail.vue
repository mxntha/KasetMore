<template>
  <v-card :loading="!productDetail" color="">
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="4">
            <v-carousel
              height="400"
              hide-delimiters
              class="mx-auto"
              v-model="carouselIndex"
            >
              <v-carousel-item
                v-for="i in productDetail?.productImages"
                :key="i.attatchmentId"
                cover
              >
                <v-img
                  :src="i.image"
                  cover
                  class="d-flex align-center justify-center"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col>
            <div class="text-h3 pb-9">{{ productDetail?.productName }}</div>
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
                        type="number"
                        v-model="amount"
                        :min="1"
                        :max="productDetail?.amount"
                        @input="validateAmount"
                        style="text-align: center"
                      >
                        <template v-slot:append>
                          <v-icon
                            color="red"
                            class="cursor-pointer"
                            @click="incrementAmount"
                          >
                            mdi-plus
                          </v-icon>
                        </template>
                        <template v-slot:prepend>
                          <v-icon
                            color="green"
                            class="cursor-pointer"
                            @click="decrementAmount"
                          >
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
    <v-card-title class="font-weight-black">รายละเอียดสินค้า</v-card-title>
    <v-card-text>
      <div class="text-h5">{{ productDetail?.description }}</div>
    </v-card-text>
  </v-card>
  <v-card :loading="!productDetail" class="mt-4">
    <v-card-title class="font-weight-black">ข้อมูลร้านค้า</v-card-title>
    <v-card-text>
      <div class="text-h5">{{ userDisplay?.userName }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { ProductCard } from '@/components/productCard/interface'
import { useProductApi, useUserApi } from '@/composables/api'
import { ProductDetailById } from '@/composables/api/interface'

const route = useRoute()
const productId = route.params.productId as string
const amount = ref(1)
const productDetail = ref<ProductDetailById | null>(null)
const productApi = useProductApi()
const userApi = useUserApi()
const loading = ref(true)
const userDisplay = ref()
const carouselIndex = ref(0)

onMounted(async () => {
  loading.value = true
  productDetail.value = await productApi.getById(productId)
  if (!productDetail.value) {
    alert('หาไม่เจอ')
    router.push({ name: 'Index' })
  }
  userDisplay.value = (await userApi.userByEmail(
    productDetail.value!.userEmail
  )) || {
    address: '',
    email: '',
    userType: '',
    lastName: '',
    name: '',
    phoneNumber: '',
    userName: '',
    idCard: '',
    laserCard: '',
    profileUrl: '',
    statusType: '',
  }

  loading.value = false
})

function validateAmount() {
  if (amount.value < 1) {
    amount.value = 1
  } else if (productDetail.value && amount.value > productDetail.value.amount) {
    amount.value = productDetail.value.amount
  }
}

function incrementAmount() {
  if (productDetail.value && amount.value < productDetail.value.amount) {
    amount.value += 1
  }
}

function decrementAmount() {
  if (amount.value > 1) {
    amount.value -= 1
  }
}

function buyProduct() {
  router.push({
    name: 'BuyResult',
    query: { amount: amount.value },
    params: { productId: productDetail.value?.productId },
  })
}
</script>
