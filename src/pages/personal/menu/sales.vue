<template>
  <v-card class="ma-8" height="835">
    <div class="d-flex flex-row">
      <v-card class="ma-8" height="180" width="300">
        <div class="text-h5 ma-6">ยอดรวม :</div>
        <div class="text-h4 pt-3 text-center">฿</div>
      </v-card>

      <v-card class="ma-8" height="180" width="300">
        <div class="text-h5 ma-6">ออเดอร์ :</div>
        <div class="text-h4 pt-3 text-center">10</div>
      </v-card>
    </div>

    <div class="d-flex flex-row mt-n3">
      <v-card class="ma-10" height="530" width="700">
        <div class="text-h5 ma-4">ยอดขายรายเดือน</div>
        <v-divider></v-divider>
        <div></div>
      </v-card>

      <v-card class="ma-10" height="530" width="700">
        <div class="text-h5 ma-4">สินค้าขายดี</div>
        <v-divider></v-divider>
        <div class="text-center mt-16">
          <v-progress-circular
            :model-value="30"
            :rotate="360"
            :size="200"
            :width="30"
            color="teal"
          >
          </v-progress-circular>
        </div>
      </v-card>
    </div>
  </v-card>
</template>

<script setup lang="ts"></script>
