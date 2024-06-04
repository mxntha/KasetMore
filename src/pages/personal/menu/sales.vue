<template>
  <v-card class="h-100">
    note<br />
    หากไม่มีข้อมูลเลยจะเเสดงหน้ายังไง <br />
    หลังจากกดปุ่ม ต่างๆในหน้านี้จะเกิดอะไรขึ้้นบ้าง <br />
    ในกราฟจะเเสดงข้อมูลอะไรบ้าง <br />
    ต่อ api อะไรมาบ้าง <br />
    ปุ่มกดได้่ทุกอันไหม
    <div class="d-flex flex-row">
      <v-card class="ma-8" height="180" width="300">
        <div class="text-h5 ma-6">ยอดรวม :</div>
        <div class="text-h4 pt-3 text-center">฿</div>
      </v-card>

      <v-card class="ma-8" height="180" width="300">
        <div class="text-h5 ma-6">ออเดอร์ :</div>
        <div class="text-h4 pt-3 text-center">10</div>
      </v-card>

      <v-card class="ma-8" height="180" width="300">
        <div class="text-h5 ma-6">จำนวนสินค้า :</div>
        <div class="text-h4 pt-3 text-center">10</div>
      </v-card>
    </div>

    <div class="d-flex flex-row mt-n3">
      <v-card class="ma-10" height="530" width="700">
        <div class="text-h5 ma-4">ยอดขายรายเดือน</div>
        <v-divider></v-divider>
        <div>
          <apexchart :options="line.options" :series="line.series"></apexchart>
        </div>
      </v-card>

      <v-card class="ma-10" height="530" width="700">
        <v-card-title class="text-h5 my-2">
          <div>สินค้าขายดี</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-0">
          <apexchart :options="donut.options" :series="donut.series"></apexchart
        ></v-card-text>
      </v-card>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const line = ref({
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
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
  },
  series: [
    {
      name: 'Category A',
      data: [40, 30, 45, 50, 49, 60, 70, 91],
    },
    {
      name: 'Category B',
      data: [50, 49, 60, 30, 40, 45, 70, 91],
    },
    {
      name: 'Category C',
      data: [30, 60, 70, 91, 40, 45, 50, 49],
    },
  ],
})
const donut = ref({
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
    labels: ['Category A', 'Category B', 'Category C'],
  },
  series: [44, 55, 41],
})
</script>
