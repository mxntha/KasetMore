<template>
  note: <br />

  &nbsp; กด หมวดหมู่ เเล้วดึงสินค้าตามหมวดหมู่ <br />
  &nbsp;หลังดึงข้อมูลเสร็จ จะพาไปหน้าไหนต่อ ? <br />
  ต่อ api สินค้าทั้งหมด<br />
  ปุ่มกดได้่ทุกอันไหม <br />
  &nbsp; เรื่องการsearch ชื่อสินค้า

  <div class="mx-20">
    <div id="section-category" class="">
      <v-card>
        <v-card-title>หมวดหมู่</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col v-for="cate in categories" :key="cate.categoryName">
                <v-card height="180" style="background-color: #eddbce">
                  <v-row>
                    <v-col>
                      <v-img
                        :src="cate.catagoryImg"
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
import { useProductApi, useCategoryApi } from '@/composables/api'
import { useDisplay } from 'vuetify'
import { Category } from '@/composables/api/index'

const categoryApi = useCategoryApi()
const productApi = useProductApi()
const searchState = inject(searchPluginSymbol)!
const data = ref<any>('')
const loading = ref(true)
const maxItem = 12
const _productlist = ref<ProductCard[]>([])
const categories = ref<Category[]>([])
const { xs, sm, md, lg, xlAndUp } = useDisplay()

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
  console.log(cols.value) // false
  loading.value = true
  _productlist.value = await productApi.getAll()
  categories.value = await categoryApi.getAll()
  console.log('categoriesApi', categories.value)
  categories.value.forEach((category) => {
    // Assign images based on categoryName or categoryId
    switch (category.categoryName) {
      case 'Vegetable':
        category.catagoryImg = vegetable
        break
      case 'Healthy Food':
        category.catagoryImg = healthy
        break
      case 'Gardening Tools':
        category.catagoryImg = gardening
        break
      case 'Growing Plant':
        category.catagoryImg = growing
        break
      default:
        category.catagoryImg = '' // default image or leave empty
    }
    console.log(
      `Category: ${category.categoryName}, Image: ${category.catagoryImg}`
    )
  })
  loading.value = false
  console.log('categories', categories.value)
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
const productlist = computed(() =>
  filterProduct.value.length > maxItem
    ? filterProduct.value.filter(
        (x, i) =>
          i + 1 > (currentPage.value - 1) * maxItem &&
          i + 1 <= currentPage.value * maxItem
      )
    : filterProduct.value
)
function buyClick(id: string) {
  router.push({ name: 'ProductDetail', params: { productId: id } })
}
</script>
