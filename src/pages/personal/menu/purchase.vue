<template>
  <v-card :loading="loading" class="ma-8" height="835">
    <v-card-title>ประวัติการซื้อ</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col v-for="i in purchaseData" cols="12">
          <v-card>
            <div class="d-flex ma-2">
              <v-icon icon="mdi-store"></v-icon>
              <div class="pl-2">ชื่อร้านค้า : {{ i.sellerId }}</div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex">
              <v-img height="200" width="100"> </v-img>
              <div class="pt-4">ชื่อสินค้า</div>
              {{ i.product }}
            </div>
            <v-divider></v-divider>
            <div class="ma-3">รวมการสั่งซื้อ : {{ i.total }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import router from '@/router'
import { ProductCard } from '@/components/productCard/interface'
import { Purchase, usePurchaseApi } from '@/composables/api'
import { onMounted } from 'vue'

const route = useRoute()
const purchaseData = ref<Purchase[]>([])
const loading = ref(true)
const purchaseApi = usePurchaseApi()
onMounted(async () => {
  loading.value = true
  purchaseData.value = await purchaseApi.getAll()
  loading.value = false
})
</script>
<style scoped>
.v-card {
  overflow-y: auto;
}
</style>
