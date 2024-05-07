<template>
  
  <v-card>
    <div class="d-flex justify-space-around align-center bg-grey-lighten-4">
        <div class="ma-4">
      <div class="text-subtitle-2"></div>
      <v-img
        :aspect-ratio="1"
        class="bg-white"
        :src= "productDetail?.picture" alt=""
        width="300"
        cover
      ></v-img>
    </div>
</div>
  </v-card>
    <div>
        {{ route.params.productId }} : {{ productDetail }}
    </div>
    <v-text-field label="จำนวนสินค้า" type="number" v-model="amount"></v-text-field>
<v-btn color="green" @click="buyProduct">
    สั่งซื้อ
</v-btn>

</template>




<script setup lang="ts">
import { computed,ref } from 'vue';
import { useRoute } from 'vue-router'
import {productData} from '@/fakeDb'
import router from '@/router'
const route = useRoute()
const productId = route.params.productId
const amount = ref(1)
const productDetail = computed(()=> productData.find(x=>x.id === productId))
if(productDetail.value == null ){
    alert('หาไม่เจอ')
    router.push({name:'productDetail',params:{productId:productId}})
}
function buyProduct(){
    router.push({name:'BuyResult',query:{amount:amount.value},params:{productId:productDetail.value?.id}})
}
</script>