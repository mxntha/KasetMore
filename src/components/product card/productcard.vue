<template>
   <v-card

class="mx-auto my-12"
max-width="374"
>
<template v-slot:loader="{ isActive }">
  <v-progress-linear
    :active="isActive"
    color="deep-purple"
    height="4"
    indeterminate
  ></v-progress-linear>
</template>

<v-img
  cover
  height="250"
  :src = "props.ProductData.picture"
></v-img>

<v-card-item>
  <v-card-title>{{ props.ProductData.name }}</v-card-title>

  
</v-card-item>

<v-card-text>
  
  <v-row
    align="start"
    class="mx-0"
  >
  
    <v-rating
      :model-value= "props.ProductData.rating"
      color="amber"
      density="compact"
      half-increments
      readonly
      size="small"
    ></v-rating>

    <div class="text-grey ms-4">{{ props.ProductData.rating }}</div>
  </v-row>


  <div class="my-5 text-subtitle-1"> {{ props.ProductData.province }}</div>

  <div>{{ props.ProductData.description}}</div>

 <br>

  <div class="d-flex justify-space-between mb-6">  
    <div class=" text-subtitle-1"> ฿ {{ props.ProductData.price}}</div>  
    <div> จำนวน:{{ props.ProductData.amount }}</div> 
  </div>

  </v-card-text>
 
<v-card-actions>
  <v-btn
    color="deep-purple-lighten-2"
    variant="text"

  >
    เพิ่มลงตะกร้า
  </v-btn>
  <v-btn
    color="deep-purple-lighten-2"
    variant="text"
    align = "and"
  >
    สั่งซื้อ
  </v-btn>
</v-card-actions>
</v-card>

    
  </template>
  
<script lang="ts" setup>

import {ProductCard} from '@/components/product card/interface'
   
   const props = defineProps<{ProductData:ProductCard}>()
    
  
  
</script>