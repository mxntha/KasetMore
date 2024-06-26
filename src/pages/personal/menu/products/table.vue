<template>
  <v-data-table-virtual
    :items="props.dataTable"
    :loading="props.loading"
    :headers="headers"
  >
    <!-- ส่วนหัวของตาราง -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>สินค้า</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          class="mb-2"
          color="primary"
          dark
          @click="emit('create-product')"
        >
          เพิ่มสินค้า
        </v-btn>
      </v-toolbar>
    </template>
    <!-- ส่วนการดำเนินการ -->
    <template v-slot:item.action="{ item }">
      <v-icon
        color=""
        class="mr-4"
        size="small"
        @click="
          () => {
            console.log('sras')
            emit('edit-product', item.productId)
          }
        "
      >
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="emit('delete-product', item.productId)">
        mdi-delete
      </v-icon>
    </template>
    <!-- ไม่มีข้อมูล -->
    <template v-slot:no-data>
      <div class="text-center">
        <div class="ma-6">
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
        <v-btn class="ma-6" color="primary" @click="emit('refresh-data')"
          >Reset</v-btn
        >
      </div>
    </template>
    <!-- ส่วนของรูปภาพ -->
    <template v-slot:item.picture="{ item }">
      <v-card class="my-2" elevation="2" rounded>
        <v-img :src="item.picture" height="64" cover></v-img>
      </v-card>
    </template>
    <!-- รายละเอียดสินค้า -->
    <template v-slot:item.description="{ item }">
      <div style="width: 800px">
        {{ item.description }}
      </div>
    </template>
  </v-data-table-virtual>
</template>
<script setup lang="ts">
import { Product } from '@/composables/api'
import { PropType, ref } from 'vue'

const emit = defineEmits<{
  (e: 'create-product'): void
  (e: 'edit-product', id: string): void
  (e: 'delete-product', id: string): void
  (e: 'refresh-data'): void
}>()
const props = defineProps({
  dataTable: {
    type: Object as PropType<Product[]>,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: () => true,
  },
})

const headers = [
  { title: 'รหัสสินค้า', value: 'productId' },
  { title: 'รูปภาพ', value: 'picture' },
  { title: 'ชื่อสินค้า', value: 'productName' },
  { title: 'ราคาสินค้า', value: 'price' },
  { title: 'จำนวนสินค้า', value: 'amount' },
  { title: 'จังหวัด', value: 'province' },
  { title: 'รายละเอียดสินค้า', value: 'description' },
  { title: 'ดำเนินการ', value: 'action' },
]
</script>
