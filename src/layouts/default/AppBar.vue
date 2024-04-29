<template>
  <v-app-bar color="deep-purple" app dense fixed hide-on-scroll>
    <template v-slot:prepend>
      <div  class="text-h5" @click="router.push({name:'Index'})">Logo</div>
    </template>
    <v-app-bar-title @click="router.push({name:'Index'})">Kaset More</v-app-bar-title>
    <v-text-field
    v-if="isShowSearchBar"
      append-inner-icon="mdi-magnify"
      density="compact"
      label="ค้นหา"
      variant="solo"
      :model-value="searchState.searchTextState"
      hide-details
      single-line
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn @click="" v-if="isShowMenu">เข้า</v-btn>

    <v-divider vertical v-if="isShowMenu"></v-divider>

    <v-btn @click="gotoshoppingCart" >ตะกร้าของฉัน</v-btn>
    <v-divider vertical></v-divider>

    <v-menu v-if="isShowMenu">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" class="mx-2">
          <v-avatar icon="mdi-account" color="white"></v-avatar>
        </v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <div class="d-flex align-center justify-space-around">
            <v-avatar color="info">
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
          </div>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item variant="text" class="mx-2" @click="gotopersonal">
            บัญชี
          </v-list-item>
          <v-list-item variant="text" class="mx-2" @click="gotoregisterFarmer">
            สมัครสมาชิกเกษตรกร
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { searchPluginSymbol } from '@/plugins/search'
import { computed } from 'vue';
const router = useRouter()
const route = useRoute()
const drawer = ref(false)
const searchState = inject(searchPluginSymbol)!
const showList = ['Index']
const isShowSearchBar = computed(()=>showList.some(x=>x==route.name))
const isShowMenu = computed(()=>showList.some(x=>x==route.name))

function gotoshoppingCart() {
  router.push({ path: '/shoppingCart' })
}
function gotoregisterFarmer() {
  router.push({ path: '/registerFarmer' })
}
function gotopersonal() {
  router.push({ path: '/personal' })
}
</script>
