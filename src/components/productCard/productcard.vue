<template>
  <v-card class="mx-auto" max-width="300">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img cover height="250" :src="props.ProductData.picture"></v-img>

    <v-card-item>
      <v-card-title>{{ props.ProductData.name }}</v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="d-flex justify-space-between w-100 mb-2">
        <div class="text-subtitle-1">{{ props.ProductData.province }}</div>
        <div class="d-flex">
          <v-rating
            :model-value="props.ProductData.rating"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>

          <div class="text-grey ml-2">{{ props.ProductData.rating }}</div>
        </div>
      </div>
      <div>{{ props.ProductData.description }}</div>
      <div class="d-flex justify-space-between mt-2">
        <div class="text-subtitle-1">฿ {{ props.ProductData.price }}</div>
        <div>จำนวน:{{ props.ProductData.amount }}</div>
      </div>
    </v-card-text>

    <v-card-actions>
      <!-- <v-btn color="deep-purple-lighten-2" variant="text">
        เพิ่มลงตะกร้า
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn color="deep-purple-lighten-2" variant="text" @click="onClick">
        ดูรายละเอียด
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { ProductCard } from './interface'
const emit = defineEmits<{
  (e: 'onClick'): void
}>()
const props = defineProps<{ ProductData: ProductCard }>()
function onClick() {
  emit('onClick')
}
</script>
