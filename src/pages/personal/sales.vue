<template>
  <v-card class="h-100" :loading="loading">
    <v-card-title>สรุปการขาย</v-card-title>
    <v-card-text v-if="!loading">
      <div class="d-flex flex-row">
        <v-card class="ma-8" height="180" width="300">
          <div class="text-h5 ma-6">ยอดรวม :</div>
          <div class="text-h4 pt-3 text-center">
            {{ salesData.reduce((x, y) => x + y.amount * y.price, 0) }} $
          </div>
        </v-card>

        <v-card class="ma-8" height="180" width="300">
          <div class="text-h5 ma-6">ออเดอร์ :</div>
          <div class="text-h4 pt-3 text-center">{{ salesData.length }}</div>
        </v-card>

        <v-card class="ma-8" height="180" width="300">
          <div class="text-h5 ma-6">จำนวนสินค้า :</div>
          <div class="text-h4 pt-3 text-center">
            {{ salesData.reduce((x, y) => x + y.amount, 0) }}
          </div>
        </v-card>
      </div>

      <div class="d-flex flex-row mt-n3">
        <v-card class="ma-10" height="530" width="700">
          <div class="text-h5 ma-4">ยอดขายรายเดือน</div>
          <v-divider></v-divider>
          <div>
            <apexchart
              :options="line.options"
              :series="line.series"
            ></apexchart>
          </div>
        </v-card>

        <v-card class="ma-10" height="530" width="700">
          <v-card-title class="text-h5 my-2">
            <div>สัดส่วนยอดการขายเเต่ละชนิด</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="py-0">
            <apexchart
              :options="donut.options"
              :series="donut.series"
            ></apexchart
          ></v-card-text>
        </v-card></div
    ></v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import ApexCharts from 'apexcharts'
import { ref, onMounted, inject, computed } from 'vue'
import { TransectionModel } from '@/composables/api/useTransactionApi'
import {
  Category,
  Product,
  useCategoryApi,
  useProductApi,
  useTransactionApi,
} from '@/composables/api'
import { contextPluginSymbol } from '@/plugins/context'
const productApi = useProductApi()
const loading = ref(true)
const salesData = ref<TransectionModel[]>([])
const transactionApi = useTransactionApi()
const info = inject(contextPluginSymbol)!
const months = [
  { index: 1, month: 'ม.ค' },
  { index: 2, month: 'ก.พ' },
  { index: 3, month: 'มี.ค' },
  { index: 4, month: 'เม.ย' },
  { index: 5, month: 'พ.ค' },
  { index: 6, month: 'มิ.ย' },
  { index: 7, month: 'ก.ค' },
  { index: 8, month: 'ส.ค' },
  { index: 9, month: 'ก.ย' },
  { index: 10, month: 'ต.ค' },
  { index: 11, month: 'พ.ย' },
  { index: 12, month: 'ธ.ค' },
]
const infomation = inject(contextPluginSymbol)!
const allProduct = ref<Product[]>([])
const categoryApi = useCategoryApi()
const categories = ref<Category[]>([])

onMounted(async () => {
  loading.value = true
  allProduct.value = await productApi.getByEmail(
    infomation.userInfomation.value?.email!
  )
  salesData.value = await transactionApi.getBySeller(
    info.userInfomation.value?.email!
  )
  categories.value = await categoryApi.getAll()
  loading.value = false
})
const line = computed(() => {
  return {
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      yaxis: {
        labels: {
          formatter: function (value: string) {
            return value + ' บาท'
          },
        },
      },
      xaxis: {
        categories: months.map((x) => x.month),
      },
    },
    series: [
      {
        name: 'จำนวนยอดขายรายเดือน',
        data: months.map((x) => {
          return salesData.value
            .filter((f) => new Date(f.createDate).getMonth() + 1 == x.index)
            .reduce((z, y) => z + y.price * y.amount, 0)
        }),
      },
    ],
  }
})
const donut = computed(() => {
  return {
    options: {
      height: 300,
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '45%',
          },
          customScale: 0.8,
        },
      },
      labels: categories.value.map((x) => x.categoryName),
    },
    series: categories.value.map((x) =>
      salesData.value
        .filter(
          (a) =>
            allProduct.value.find((f) => f.productId == a.productId.toString())
              ?.category == x.categoryName
        )
        .reduce((z, y) => z + y.price * y.amount, 0)
    ),
  }
})
</script>
