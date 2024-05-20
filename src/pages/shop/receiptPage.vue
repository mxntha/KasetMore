<template>
  <v-card class="ma-8" height="835">
    <v-card-title class="text-center text-h4 ma-2">
      ใบเสร็จชำระเงิน
    </v-card-title>
    <v-row>
      <v-col cols="2">
        <div class="d-flex">
          <div class="ma-2 pl-2 text-h6">Logo</div>
          <div class="ma-2 text-h6">Kaset More</div>
        </div>
        <div>
          <div class="ma-2 pl-2">ชื่อร้านค้า</div>
          <div class="ma-2 pl-2">ที่อยู่ร้านค้า</div>
        </div>
        <div class="d-flex ma-2">
          <div class="d-flex flex-row-reverse">dgf</div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
