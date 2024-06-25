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
      <v-row v-if="purchaseData.length > 0">
        <v-col v-for="i in purchaseData" :key="i.transactionId" cols="12">
          <v-card>
            <div class="d-flex ma-2">
              <v-icon icon="mdi-store"></v-icon>
              <div class="pl-2">ชื่อร้านค้า : {{ userDisplay.userName }}</div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex">
              <v-img height="100" width="50"> </v-img>
              <div class="pt-4">ชื่อสินค้า</div>
              {{ i.productId }}
            </div>
            <v-divider></v-divider>
            <div class="ma-3">รวมการสั่งซื้อ : {{ i.price * i.amount }}</div>
          </v-card>
        </v-col>
      </v-row>
      <div class="ma-16" v-else>
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
import { useTransactionApi, useProductApi, useUserApi } from '@/composables/api'
import { ProductDetailById } from '@/composables/api/interface'
import { onMounted, computed, inject } from 'vue'
import { contextPluginSymbol } from '@/plugins/context'
import { TransectionModel } from '@/composables/api/useTransactionApi'
const info = inject(contextPluginSymbol)!

const route = useRoute()
const purchaseData = ref<TransectionModel[]>([])
const loading = ref(true)
const transactionApi = useTransactionApi()
const productDetail = ref<ProductDetailById[]>([])
const productApi = useProductApi()
const userDisplay = ref<any>(null)
const userApi = useUserApi()

onMounted(async () => {
  loading.value = true
  purchaseData.value = await transactionApi.getByBuyer(
    info.userInfomation.value?.email!
  )!

  userDisplay.value = await userApi.userByEmail(
    info.userInfomation.value!.email
  )

  loading.value = false
})
</script>
<style scoped>
.v-card {
  overflow-y: auto;
}
</style>
