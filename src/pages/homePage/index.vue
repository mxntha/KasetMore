<template>
  <v-container>
    test update
    <v-row>
      <v-col cols="3" v-for="i in productlist">
        <ProductCardvue :ProductData="i" @on-click="buyClick(i.id)"> </ProductCardvue>
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
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    all item is {{ filterProduct.length }}
  </div>
</template>

<script lang="ts" setup>
import { ProductCard } from '@/components/productCard/interface'
import ProductCardvue from '@/components/productCard/productcard.vue'
import { ref, computed, inject } from 'vue'
import { searchPluginSymbol } from '@/plugins/search'
import router from '@/router';
import {productData} from '@/fakeDb'
const searchState = inject(searchPluginSymbol)!
const maxItem = 8

const _productlist = ref<ProductCard[]>(productData)
const filterProduct = computed(() =>
  _productlist.value.filter(
    (x) =>
      searchState.searchText.value.trim() === '' ||
      x.name.includes(searchState.searchText.value),
  ),
)
const currentPage = ref(1)
const allPages = computed(() =>
  filterProduct.value.length / maxItem > 0
    ? Math.round(filterProduct.value.length / maxItem)
    : 1,
)
const productlist = computed(() =>
  filterProduct.value.length > maxItem
    ? filterProduct.value.filter(
        (x, i) =>
          i + 1 > (currentPage.value - 1) * maxItem &&
          i + 1 <= currentPage.value * maxItem,
      )
    : filterProduct.value,
)
function buyClick(id:string){
  router.push({name:'ProductDetail',params:{productId:id}})
}
</script>
