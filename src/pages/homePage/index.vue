<template>
  <!-- <data v-if="productlist.length == 0">loading api . . .</data> -->
  <div class="mx-20">
    <div id="section-category" class="">
      <v-card>
        <v-card-title>หมวดหมู่</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col v-for="cate in categories" :key="cate.value">
                <v-card>
                  <v-img height="120" :src="cate.img"> {{ cate }}</v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </div>
    <div id="section-suggestion " class="mt-4">
      <v-card :loading="loading">
        <v-card-title>สินค้า</v-card-title>
      </v-card>
      <v-container fluid>
        <v-row>
          <v-col xl="1" xxl="1" lg="2" md="3" v-for="i in productlist">
            <ProductCardvue
              class="w-100"
              :ProductData="i"
              @on-click="buyClick(i.id)"
            ></ProductCardvue>
          </v-col>
        </v-row>
      </v-container>
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
import { ProductCard } from '@/components/productCard/interface'
import ProductCardvue from '@/components/productCard/productcard.vue'
import { ref, computed, inject } from 'vue'
import { searchPluginSymbol } from '@/plugins/search'
import router from '@/router'
import { useProductApi } from '@/composables/api'
const categories = [
  { value: 'ผัก', img: vegetable },
  { value: 'ผลไม้', img: '@/assets/healthy-food.png' },
  { value: 'อุปเกษตร', img: '@/assets/gardening-tools.png' },
  { value: 'ต้นไม้', img: '@/assets/growing-plant.png' },
]
const productApi = useProductApi()
const searchState = inject(searchPluginSymbol)!
const data = ref<any>('')
const loading = ref(true)
const maxItem = 12
const _productlist = ref<ProductCard[]>([])
;(async () => {
  loading.value = true
  _productlist.value = await productApi.getAll()
  loading.value = false
})()
const filterProduct = computed(() =>
  _productlist.value.filter(
    (x) =>
      searchState.searchText.value.trim() === '' ||
      x.name.includes(searchState.searchText.value)
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
