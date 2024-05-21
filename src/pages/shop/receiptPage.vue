<template>
  <v-card class="ma-8" height="835">
    <v-card-title class="text-center ma-2">
      <div class="d-flex">
        <div class="ma-2 pl-2 text-h4">Logo</div>
        <div class="ma-2 text-h4">Kaset More</div>
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
  </v-card>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const headers = [
  { title: 'ลำดับ' },
  { title: 'รายการ' },
  { title: 'จำนวน' },
  { title: 'หน่วย' },
  { title: 'ราคา' },
  { title: 'ยอดรวม' },
]
</script>
