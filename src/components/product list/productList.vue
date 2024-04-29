<template>
  <v-infinite-scroll ref="infinite" height="500" side="both" @load="load">
    <div>
      <template v-for="card in cards" :key="card">
        <v-sheet height="size" class="d-flex align-center justify-center">
          <div>{{ card }}</div>
        </v-sheet>
      </template>
    </div>
  </v-infinite-scroll>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ProductList } from '@/components/product list/interface'
import { ref, defineProps } from 'vue'
const cards: string[] = []
const load = () => {}
const props = defineProps<{ ProductData: ProductList }>()
</script>
