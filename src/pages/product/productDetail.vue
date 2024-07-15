<template>
  <v-card :loading="loading" color="">
    <v-card-text>
      <v-container v-if="!loading" fluid>
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
                  class="d-flex align-center justify-center h-100 w-100"
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
                    <v-col>
                      <div class="text-h6 align-self-center pb-5">
                        จำนวนสินค้า {{ productDetail?.amount }}
                        {{ unitName }}
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <div class="d-flex">
              <v-btn
                class="text-h6"
                color="green"
                :disabled="loading"
                @click="buyProduct"
              >
                สั่งซื้อ
              </v-btn>
              <v-btn
                class="ml-4"
                color="warning"
                v-if="!!productDetail"
                @click="addToCart"
              >
                เพิ่มลงตะกร้า
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>

  <v-card :loading="loading" class="mt-4">
    <v-card-title class="font-weight-black">รายละเอียดสินค้า</v-card-title>
    <v-card-text v-if="!loading">
      <div class="text-h5">{{ productDetail?.description }}</div>
    </v-card-text>
  </v-card>
  <v-card :loading="loading" class="mt-4">
    <v-card-title class="font-weight-black">ข้อมูลร้านค้า</v-card-title>
    <v-card-text v-if="userDisplay && !loading">
      <div class="d-flex">
        <div>
          <p>
            <span class="text-h5 font-weight-bold">ชื่อร้าน : </span>
            <span class="text-h5">{{ userDisplay.userName }}</span>
          </p>
          <p>
            <span class="text-h5 font-weight-bold">จัดขายโดย : </span>
            <span class="text-h5">{{ userDisplay.name }}</span>
            <span class="text-h5 ml-3">{{ userDisplay.lastName }}</span>
          </p>
        </div>
        <div class="ml-8">
          <p>
            <span class="text-h5 font-weight-bold">ติดต่อได้ที่ : </span>
            <span class="text-h5">{{ userDisplay.phoneNumber }}</span>
          </p>
          <p>
            <span class="text-h5 font-weight-bold">ที่อยู่ : </span>
            <span class="text-h5">{{ userDisplay.address }}</span>
          </p>
        </div>
      </div>
      <v-btn
        color="orange-lighten-2"
        v-if="userDisplay.email"
        :to="{ name: 'Shop', params: { email: userDisplay.email } }"
        >ดูสินค้าของร้านเพิ่มเติม</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useProductApi, useUserApi, useUnitApi } from '@/composables/api'
import { ProductDetailById, UnitApiModel } from '@/composables/api/interface'
import { BaseUserInfo } from '@/composables/api/useUserApi'
import { cartPluginSymbol } from '@/plugins/cart'
import { toast } from 'vue3-toastify'

const cart = inject(cartPluginSymbol)!
const route = useRoute()
const productId = route.params.productId as string
const amount = ref(1)
const productDetail = ref<ProductDetailById | null>(null)
const productApi = useProductApi()
const userApi = useUserApi()
const loading = ref(true)
const userDisplay = ref<BaseUserInfo | null>(null)
const carouselIndex = ref(0)
const unitApi = useUnitApi()
const units = ref<UnitApiModel[]>([] as { unitId: number; unitName: string }[])

const unitName = computed(() => {
  if (productDetail.value && units.value.length) {
    const unit = units.value.find(
      (u) => `${u.unitId}` == productDetail.value!.unit
    )
    return unit ? unit.unitName : 'ไม่พบหน่วย'
  }
  return 'ไม่พบหน่วย'
})
function addToCart() {
  cart.addProductToCart({
    category: productDetail.value!.category,
    description: productDetail.value!.description,
    price: productDetail.value!.price,
    amount: amount.value,
    picture: '',
    productId: `${productDetail.value!.productId}`,
    productName: productDetail.value!.productName,
    province: productDetail.value!.province,
    unitId: productDetail.value!.unit,
    userEmail: productDetail.value!.userEmail,
    rating: productDetail.value!.rating,
  })
  toast.success(
    `เพิ่ม ${productDetail.value!.productName} จำนวน ${amount.value} ${
      unitName.value
    } ลงตะกร้าเรียบร้อยเเล้ว`
  )
}
onMounted(async () => {
  loading.value = true
  productDetail.value = await productApi.getById(productId)

  if (productDetail.value) {
  } else {
    alert('ไม่พบข้อมูลสินค้า')
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
  units.value = await unitApi.getAll()

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
