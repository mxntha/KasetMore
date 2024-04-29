<template>
  <v-container>
    <v-row>
      <v-col cols="3" v-for="i in productlist">
        <ProductCardvue :ProductData="i"> </ProductCardvue>
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
all item is    {{ filterProduct.length }}
  </div>
</template>

<script lang="ts" setup>
import { ProductCard } from '@/components/product card/interface'
import ProductCardvue from '@/components/product card/productcard.vue'
import { ref, computed,inject } from 'vue'
import { searchPluginSymbol } from '@/plugins/search'
const searchState = inject(searchPluginSymbol)!

const _productlist = ref<ProductCard[]>([
  {
    name: 'ทุเรียน',
    price: 70,
    amount: 50,
    picture:
      'https://s.isanook.com/tr/0/ud/282/1410525/fwegt.jpg?ip/crop/w728h431/q80/webp',
    id: '',
    province: 'จันทบุรี',
    rating: 4,
    description: 'พันธุ์หมอนทอง เนื้อนุ่ม เนื้อเนียน',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'ทุเรียน',
    price: 70,
    amount: 50,
    picture:
      'https://s.isanook.com/tr/0/ud/282/1410525/fwegt.jpg?ip/crop/w728h431/q80/webp',
    id: '',
    province: 'จันทบุรี',
    rating: 4,
    description: 'พันธุ์หมอนทอง เนื้อนุ่ม เนื้อเนียน',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'ทุเรียน',
    price: 70,
    amount: 50,
    picture:
      'https://s.isanook.com/tr/0/ud/282/1410525/fwegt.jpg?ip/crop/w728h431/q80/webp',
    id: '',
    province: 'จันทบุรี',
    rating: 4,
    description: 'พันธุ์หมอนทอง เนื้อนุ่ม เนื้อเนียน',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'ทุเรียน',
    price: 70,
    amount: 50,
    picture:
      'https://s.isanook.com/tr/0/ud/282/1410525/fwegt.jpg?ip/crop/w728h431/q80/webp',
    id: '',
    province: 'จันทบุรี',
    rating: 4,
    description: 'พันธุ์หมอนทอง เนื้อนุ่ม เนื้อเนียน',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'sทุเรียน',
    price: 70,
    amount: 50,
    picture:
      'https://s.isanook.com/tr/0/ud/282/1410525/fwegt.jpg?ip/crop/w728h431/q80/webp',
    id: '',
    province: 'จันทบุรี',
    rating: 4,
    description: 'พันธุ์หมอนทอง เนื้อนุ่ม เนื้อเนียน',
  },
  {
    name: 'ทุเรียน',
    price: 70,
    amount: 50,
    picture:
      'https://s.isanook.com/tr/0/ud/282/1410525/fwegt.jpg?ip/crop/w728h431/q80/webp',
    id: '',
    province: 'จันทบุรี',
    rating: 4,
    description: 'พันธุ์หมอนทอง เนื้อนุ่ม เนื้อเนียน',
  },
  {
    name: 'ทุเรียน',
    price: 70,
    amount: 50,
    picture:
      'https://s.isanook.com/tr/0/ud/282/1410525/fwegt.jpg?ip/crop/w728h431/q80/webp',
    id: '',
    province: 'จันทบุรี',
    rating: 4,
    description: 'พันธุ์หมอนทอง เนื้อนุ่ม เนื้อเนียน',
  },
  {
    name: 'แตงโมไร้เมล็ด',
    price: 30,
    amount: 20,
    picture:
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp',
    id: '',
    province: 'นครพนม',
    rating: 3,
    description: 'ไร้เมล็ด เนื้อสวย สีแดงสด',
  },
  {
    name: 'ทุเรียน',
    price: 70,
    amount: 50,
    picture:
      'https://s.isanook.com/tr/0/ud/282/1410525/fwegt.jpg?ip/crop/w728h431/q80/webp',
    id: '',
    province: 'จันทบุรี',
    rating: 4,
    description: 'พันธุ์หมอนทอง เนื้อนุ่ม เนื้อเนียน',
  },
])
const filterProduct = computed(()=> _productlist.value.filter(x=>searchState.searchText.value.trim() === '' ||x.name.includes(searchState.searchText.value)))
const maxItem = 12
const currentPage = ref(1)
const allPages = computed(()=>
  filterProduct.value.length / maxItem > 0
    ? Math.round(filterProduct.value.length / maxItem)
    : 1,
)
const productlist = computed(() =>
filterProduct.value.length > maxItem
    ? filterProduct.value.filter((x, i) => i+1 > ((currentPage.value-1) * maxItem) && (i+1 <= currentPage.value* maxItem))
    : filterProduct.value,
)
</script>
