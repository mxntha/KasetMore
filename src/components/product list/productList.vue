<template>
    <v-infinite-scroll
      ref="infinite"
      height="500"
      side="both"
      @load="load"
    >
    
    <div>
<template v-for="card in card" :key="card" >
    <v-sheet height="size" 
    class="d-flex align-center justify-center">
    <div>{{ card }}</div>
    </v-sheet>

</template>
    </div>

    </v-infinite-scroll>
  </template>

  <script>
import { useRouter, useRoute } from 'vue-router'
import {ProductList} from '@/components/product list/interface'
import { ref } from 'vue'

const props = defineProps<{ProductData:ProductList}>

</script>