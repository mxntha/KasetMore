<template>
<v-btn @click="gotoLogin">logincustomer</v-btn>
<v-btn @click="gotoregisterFarmer">loginfarmer</v-btn>
<ProductCardvue v-for="i in productlist">
    
</ProductCardvue>
    

</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import {ProductCard} from '@/components/product card/interface'
import ProductCardvue from "@/components/product card/productcard.vue"
import { ref } from 'vue'

const productlist = ref(["atip","kuy","boring","atippa","sudsud"])

const router = useRouter()
    
function gotoLogin(){router.push({path:"/login" })}
function gotoregisterFarmer(){router.push({path:"/registerFarmer" })}
</script>