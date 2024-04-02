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
        label="Search "
        variant="solo"
        hide-details
        single-line
        
      ></v-text-field>
    </v-card-text>
  </v-card>

    <v-spacer></v-spacer>

    <v-toolbar-items>
    
    <v-divider vertical></v-divider>
        <v-btn @click="gotoLogin">logincustomer</v-btn>

      <v-divider vertical></v-divider>

      <v-btn @click="gotoregisterFarmer">loginfarmer</v-btn>

      <v-divider vertical></v-divider>

     <v-menu>

    <template v-slot:activator="{ props }">
    
    <v-btn icon v-bind="props">
        <v-avatar icon="mdi-account" color="white"></v-avatar>
    </v-btn>
    </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            subtitle="Founder of Vuetify"
            title="John Leider"
          >
            
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-btn variant="text" @click="gotoaccountCust">บัญชี</v-btn>
          </v-list-item>
          <v-btn
          
                variant="text"
                
              >
                  ศูนย์ช่วยเหลือ
              </v-btn>
          <v-list-item>
            
          </v-list-item>
        </v-list>

        
      </v-card>
    </v-menu>
  
    
      
    </v-toolbar-items>

    <v-divider vertical></v-divider>

    
  </v-toolbar>

  <ProductCardvue v-for="i in productlist">
    
</ProductCardvue>

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



const productlist = ref(["atip","ff"])

const router = useRouter()
    
function gotoLogin(){router.push({path:"/login" })}
function gotoregisterFarmer(){router.push({path:"/registerFarmer" })}
function gotoaccountCust(){router.push({path:"/accountCust"})}

</script>

