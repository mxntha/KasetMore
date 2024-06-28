<template>
  note <br />
  หากข้อมูลไม่โหลด หรือหาไอดีไม่พบจะเกิดอะไรขึ้นไหม จะเเจ้งเตือนผู้ใช้ไหม
  เเล้วพาไปหน้าไหนต่อ
  <br />
  ต่อ api อะไรไหม<br />
  ui จะปรับเเต่งอะไรเพิม่ไหม <br />
  ต้องใช้ข้อมูลอะไรบ้าง ต่อ api ไหนบ้าง
  {{ route.params }}
  <v-card class="ma-8" height="835">
    <v-card-title class="text-center ma-2">
      <div class="d-flex">
        <div class="ma-2 pl-2 text-h4">
          <v-img :src="box" alt="Logo" width="80" height="65"></v-img>
        </div>
        <div class="ma-2 text-h4 align-self-center">Kaset More</div>
      </div>
      <div class="ma-2 text-h5">ใบเสร็จชำระเงิน</div>
      <div class="d-flex">
        <div class="me-auto ma-2 pa-2">เลขที่คำสั่งซื้อ :</div>
        <div class="ma-2 pa-2">วันที่ :</div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <div class="ma-2 text-h6">ร้านค้าที่ให้บริการ</div>
          <div class="ma-2 text-body-1">ชื่อร้านค้า</div>
          <div class="ma-2 text-body-1">ที่อยู่ร้านค้า</div>
          <div class="ma-2 text-body-1">ติดต่อ</div>
        </v-col>

        <v-col cols="6">
          <div class="ma-2 text-h6">รายละเอียดผู้สั่งซื้อ</div>
          <div class="ma-2 text-body-1">ชื่อ-นามสกุล</div>
          <div class="ma-2 text-body-1">ที่อยู่</div>
          <div class="ma-2 mb-10 text-body-1">ติดต่อ</div>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-data-table-virtual :headers="headers"></v-data-table-virtual>
      <v-divider></v-divider>
      <div class="d-flex flex-row-reverse ma-2">
        <div class="text-body-1">฿</div>
        <div class="text-body-1">ยอดรวม :</div>
      </div>
    </v-card-text>
    <div class="d-flex justify-end ma-2">
      <div class="mr-3">
        <v-btn block prepend-icon="mdi-home" @click="gotoIndexLogin">
          หน้าแรก
        </v-btn>
      </div>
      <div class="mr-3">
        <v-btn block prepend-icon="mdi-clipboard-text" @click="gotoPurchase">
          ประวัติการซื้อ
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import box from '@/assets/box.png'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useTransactionApi } from '@/composables/api'
import { TransectionModel } from '@/composables/api/useTransactionApi'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const transactionApi = useTransactionApi()
const transaction = ref<TransectionModel[]>([])

const headers = [
  { title: 'ลำดับ' },
  { title: 'รายการ' },
  { title: 'จำนวน' },
  { title: 'หน่วย' },
  { title: 'ราคา' },
  { title: 'ยอดรวม' },
]

onMounted(async () => {
  loading.value = true
  //transaction.value = await transactionApi.getByBuyer()
  loading.value = false
})

function gotoIndexLogin() {
  router.push({ name: 'Index' })
}
function gotoPurchase() {
  router.push({ name: 'Purchase' })
}
</script>
