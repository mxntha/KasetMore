<template>
    <div  class="d-flex justify-center ">
    <v-card color="grey-lighten-1" height="600" width="650" >
    
    <div class="d-flex justify-center">
        <v-img  height="500" width="500"  :src="productDetail?.picture" alt=""></v-img>
    </div>
    <div>
          {{ productDetail?.name }} จำนวน {{ amount }} : รวมเป็นเงิน {{ productDetail!.price * parseInt(amount!) }}
    </div>
    
<v-btn color="green" @click="buyProduct">
    ยืนยันสั่งซื้อ
</v-btn>
</v-card>
</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import {productData} from '@/fakeDb'
import router from '@/router'
const route = useRoute()
const productId = route.params.productId
const amount = route.query.amount?.toString()
if(amount == null || parseInt(amount) <= 0 || amount == undefined){
    alert('ไม่มีจำนวนซื้อ')
    router.push({name:'productDetail',params:{productId:productId}})
}
const productDetail = computed(()=> productData.find(x=>x.id === productId))
if(productDetail.value == null ){
    alert('หาไม่เจอ')
    router.push({name:'productDetail',params:{productId:productId}})
}
if( parseInt(amount!) > productDetail.value!.amount){
    alert('จำนวนซื้อมากเกินไป')
    router.push({name:'productDetail',params:{productId:productId}})
}
function generateRandomString(length:number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function buyProduct(){
    const confirmBuy = confirm('จะซื้อจริงง่ะ')
    if(confirmBuy){
        alert('กำลังหักเงิน . . . รอ 2 วิ')
        setTimeout(() => {
            alert('จ่ายเงินสำเร็จ')
            router.push({name:'Receipt',params:{receiptId :generateRandomString(16)}})
        }, 2000)
    }
    else{
        alert('ไม่ซื้อเเล้วจะกดมาเพื่อ')
    }
}
</script>