<template>
   
  <v-toolbar color="purple">
    <template v-slot:prepend>
      <div class="text-h5">Logo</div>
    </template>

    <v-divider
      class="ms-3"
      inset
      vertical
    ></v-divider>

    <v-toolbar-title>Kaset More</v-toolbar-title>

   <v-spacer></v-spacer>

   
   <v-card
    class="mx-auto"
    color="purple"
    max-width="600"
    style="width: 1000px"
    
  >
    <v-card-text>
     
      <v-text-field
        
        append-inner-icon="mdi-magnify"
        density="compact"
        label="ค้นหา"
        variant="solo"
        hide-details
        single-line
        
      ></v-text-field>
    </v-card-text>
  </v-card>

    <v-spacer></v-spacer>

    <v-toolbar-items>
    
    <v-divider vertical></v-divider>
        <v-btn @click="">เข้า</v-btn>

      <v-divider vertical></v-divider>

      <v-btn @click="gotoshoppingCart">ตะกร้าของฉัน</v-btn>

      <v-divider vertical></v-divider>

     <v-menu>

    <template v-slot:activator="{ props }">
    
    <v-btn icon v-bind="props">
        <v-avatar icon="mdi-account" color="white"></v-avatar>
    </v-btn>
    </template>

      <v-card min-width="300">
        <v-list>
        <div class="d-flex align-center justify-space-around">
    <v-avatar color="info">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-avatar>
  </div>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            
              <v-btn variant="text" @click="gotopersonal">บัญชี</v-btn>
            
          </v-list-item>
          <v-btn variant="text" @click="gotoregisterFarmer">สมัครสมาชิกเกษตรกร</v-btn>
          <v-list-item>
            
          </v-list-item>
        </v-list>

        
      </v-card>
    </v-menu>
  
    
      
    </v-toolbar-items>

    <v-divider vertical></v-divider>

    
  </v-toolbar>
  <v-container>
    <v-row>
      <v-col cols="3" v-for="i in productlist">
    
  <ProductCardvue :ProductData ="i">
    
  </ProductCardvue>
</v-col>
</v-row>
</v-container>



<div class="text-center">
    
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              
              :length="15"
              class="my-4"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>


<script lang="ts" setup>

import { useRouter, useRoute } from 'vue-router'
import {ProductCard} from '@/components/product card/interface'
import ProductCardvue from "@/components/product card/productcard.vue"
import { ref } from 'vue'



const productlist = ref<ProductCard[]>([
{      
  name : "ทุเรียน",  price : 70 , amount : 50 , picture : "https://s.isanook.com/tr/0/ud/282/1410525/fwegt.jpg?ip/crop/w728h431/q80/webp"  
  , id : "" , province : "จันทบุรี" , rating : 4 , description : "พันธุ์หมอนทอง เนื้อนุ่ม เนื้อเนียน"
},
{      
  name : "แตงโมไร้เมล็ด",  price : 30 , amount : 20 , picture : "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4VnP013buQ6b8fI5fr5B0qoSmTJpHlFZzI3XY8WQmOv03WbIGHm.webp"  
  , id : "" , province : "นครพนม" , rating : 3 , description : "ไร้เมล็ด เนื้อสวย สีแดงสด"
}
])

const router = useRouter()

    
function gotoshoppingCart(){router.push({path:"/shoppingCart"})}
function gotoregisterFarmer(){router.push({path:"/registerFarmer"})}
function gotopersonal(){router.push({path:"/personal"})}

</script>
@/pages