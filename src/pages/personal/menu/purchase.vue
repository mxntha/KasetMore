<template>
  <v-card :loading="loading" class="h-100">
    note <br />
    ต่อ api เเล้วหรือยัง <br />
    หากกดที่ card จะเกิดอะไรขึ้นไหม พาไปหน้าไหนเพิ่มไหม <br />
    ใน card ui เรียบร้อยหร่ือยัง <br />

    ปุ่มกดได้่ทุกอันไหม
    {{ purchaseData }}
    <v-card-title>ประวัติการซื้อ</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col v-for="i in purchaseData" cols="12">
          <v-card>
            <div class="d-flex ma-2">
              <v-icon icon="mdi-store"></v-icon>
              <div class="pl-2">ชื่อร้านค้า : {{ i.SellerEmail }}</div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex">
              <v-img height="200" width="100"> </v-img>
              <div class="pt-4">ชื่อสินค้า</div>
              {{ i.ProductId }}
            </div>
            <v-divider></v-divider>
            <div class="ma-3">รวมการสั่งซื้อ : {{ i.Price * i.Amount }}</div>
          </v-card>
        </v-col>
      </v-row>
      <div class="ma-16">
        <div class="d-flex justify-space-around">
          <v-icon
            class="mt-16"
            icon="mdi-archive-off"
            size="200"
            color="grey"
          ></v-icon>
        </div>
        <div class="d-flex justify-space-around text-grey">
          ไม่มีข้อมูลสินค้า
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { searchPluginSymbol } from '@/plugins/search'
import router from '@/router'
import { useTransactionApi } from '@/composables/api'
import { onMounted, computed, inject } from 'vue'
import { contextPluginSymbol } from '@/plugins/context'
import { TransectionModel } from '@/composables/api/useTransactionApi'
const info = inject(contextPluginSymbol)!

const route = useRoute()
const purchaseData = ref<TransectionModel[]>([])
const loading = ref(true)
const transactionApi = useTransactionApi()
inject
onMounted(async () => {
  loading.value = true
  purchaseData.value = await transactionApi.getByBuyer(
    info.userInfomation.value?.email!
  )!
  loading.value = false
})
</script>
<style scoped>
.v-card {
  overflow-y: auto;
}
</style>
