<template>
  <div class="mx-20">
    <div class="mb-4">
      <v-card :loading="loading">
        <v-card-title class="font-weight-black"> ช้อมูลร้านค้า </v-card-title>
        <v-card-text v-if="!loading">
          <div class="d-flex" v-if="userDisplay">
            <div>
              <div>
                <span class="text-h5 font-weight-bold">ชื่อร้าน : </span>
                <span class="text-h5">{{ userDisplay.userName }}</span>
              </div>
              <div>
                <span class="text-h5 font-weight-bold">จัดขายโดย : </span>
                <span class="text-h5">{{ userDisplay.name }}</span>
                <span class="text-h5 ml-3">{{ userDisplay.lastName }}</span>
              </div>
            </div>
            <div class="ml-8">
              <div>
                <span class="text-h5 font-weight-bold">ติดต่อได้ที่ : </span>
                <span class="text-h5">{{ userDisplay.phoneNumber }}</span>
              </div>
              <div>
                <span class="text-h5 font-weight-bold">ที่อยู่ : </span>
                <span class="text-h5">{{ userDisplay.address }}</span>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div id="section-category" class="">
      <v-card :loading="loading">
        <v-card-title>หมวดหมู่</v-card-title>
        <v-card-text v-if="!loading">
          <v-container fluid>
            <v-row>
              <v-col>
                <v-card
                  height="180"
                  style="background-color: #eddbce"
                  @click="categorySelect = null"
                  class="d-flex justify-center text-h4 align-center h-100"
                >
                  <div>ทั้งหมด</div>
                </v-card>
              </v-col>
              <v-col v-for="cate in categories" :key="cate.categoryName">
                <v-card
                  height="180"
                  style="background-color: #eddbce"
                  @click="getCategory(cate.categoryName)"
                >
                  <v-row>
                    <v-col>
                      <v-img
                        :src="getCateImage(cate)"
                        class="d-flex ma-2 pa-2 align-self-end"
                        height="120"
                      >
                      </v-img>
                      <div class="d-flex justify-center ma-2 text-h4">
                        {{ cate.categoryName }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </div>
    <div id="section-suggestion " class="mt-4">
      <v-card :loading="loading">
        <v-card-title style="background-color: #dbb48d">สินค้า</v-card-title>
      </v-card>
      <div v-if="!loading">
        <v-container fluid v-if="productlist.length > 0">
          <v-row>
            <v-col :cols="cols" v-for="i in productlist">
              <ProductCardvue
                class="w-100"
                :ProductData="i"
                @on-click="buyClick(i.productId)"
              ></ProductCardvue>
            </v-col>
          </v-row>
        </v-container>
        <div class="ma-6" v-if="productlist.length <= 0">
          <v-card height="400">
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
          </v-card>
        </div>

        <div class="text-center">
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <v-container class="max-width">
                  <v-pagination
                    :length="allPages"
                    class="my-4"
                    @update:modelValue="
                      (e) => {
                        currentPage = e
                      }
                    "
                  >
                  </v-pagination>
                </v-container>
              </v-col>
            </v-row>
          </v-container>

          all item is {{ filterProduct.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import vegetable from '@/assets/vegetable.png'
import healthy from '@/assets/healthy-food.png'
import gardening from '@/assets/gardening-tools.png'
import growing from '@/assets/growing-plant.png'

import { ProductCard } from '@/components/productCard/interface'
import ProductCardvue from '@/components/productCard/productcard.vue'
import { ref, computed, inject, onMounted } from 'vue'
import { searchPluginSymbol } from '@/plugins/search'
import router from '@/router'
import { useProductApi, useCategoryApi, useUserApi } from '@/composables/api'
import { useDisplay } from 'vuetify'
import { Category } from '@/composables/api/index'
import { useRoute } from 'vue-router'
import { BaseUserInfo } from '@/composables/api/useUserApi'
const userDisplay = ref<BaseUserInfo | null>(null)

const route = useRoute()
const emailSeller = route.params.email as string
const categoryApi = useCategoryApi()
const productApi = useProductApi()
const searchState = inject(searchPluginSymbol)!
const data = ref<any>('')
const loading = ref(true)
const maxItem = 12
const _productlist = ref<ProductCard[]>([])
const categories = ref<Category[]>([])
const { xs, sm, md, lg, xlAndUp } = useDisplay()
const userApi = useUserApi()

const cols = computed(() =>
  xs.value
    ? 12
    : sm.value
    ? 6
    : md.value
    ? 3
    : lg.value
    ? 2
    : xlAndUp.value
    ? 1
    : 3
)

onMounted(async () => {
  if (emailSeller == null) {
    alert('เกิดข้อผิดพลาด')
    router.push({ name: 'Index' })
    return
  }
  loading.value = true
  _productlist.value = await productApi.getByEmail(emailSeller)
  console.log(_productlist.value)
  categories.value = await categoryApi.getAll()
  console.log('categoriesApi', categories.value)
  userDisplay.value = await userApi.userByEmail(emailSeller)
  if (userDisplay.value == null) {
    alert('เกิดข้อผิดพลาด')
    router.push({ name: 'Index' })
    return
  }
  loading.value = false
})

const filterProduct = computed(() =>
  _productlist.value.filter(
    (x) =>
      searchState.searchText.value.trim() === '' ||
      x.productName.includes(searchState.searchText.value)
  )
)
const currentPage = ref(1)
const allPages = computed(() =>
  filterProduct.value.length / maxItem > 0
    ? Math.round(filterProduct.value.length / maxItem)
    : 1
)
const categorySelect = ref<null | string>(null)

const productlist = computed(() =>
  (filterProduct.value.length > maxItem
    ? filterProduct.value.filter(
        (x, i) =>
          i + 1 > (currentPage.value - 1) * maxItem &&
          i + 1 <= currentPage.value * maxItem
      )
    : filterProduct.value
  ).filter(
    (x) => categorySelect.value == null || x.category == categorySelect.value
  )
)

function getCateImage(category: Category): string {
  switch (category.categoryName) {
    case 'ผัก':
      return vegetable
    case 'ผลไม้':
      return healthy
    case 'อุปกรณ์การเกษตร':
      return gardening
    case 'เมล็ด':
      return growing
    default:
      return ''
  }
}

function buyClick(id: string) {
  router.push({ name: 'ProductDetail', params: { productId: id } })
}
async function getCategory(category: string) {
  categorySelect.value = category
}
</script>
