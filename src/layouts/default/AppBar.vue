<template>
  <v-app-bar color="deep-purple" app dense fixed hide-on-scroll>
    <template v-slot:prepend>
      <div
        class="text-h5 cursor-pointer"
        @click="router.push({ name: 'Index' })"
      >
        Logo
      </div>
    </template>
    <v-app-bar-title
      class="cursor-pointer"
      @click="router.push({ name: 'Index' })"
      >Kaset More</v-app-bar-title
    >
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
    <v-btn @click="gotologin" v-if="!isLogin">เข้าสู่ระบบ</v-btn>

    <v-divider vertical v-if="isShowMenu"></v-divider>

    <v-btn @click="gotoregisterCust" v-if="!isLogin">สมัครสมาชิก</v-btn>
    <v-divider vertical></v-divider>

    <v-menu v-if="isShowMenu">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" class="mx-2" v-if="isLogin">
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

          <v-list-item
            variant="text"
            class="mx-2"
            @click="gotoregisterFarmer"
            v-if="!isFarmer"
          >
            สมัครสมาชิกเกษตรกร
          </v-list-item>

          <v-list-item
            variant="text"
            class="mx-2"
            @click="gotoregisterFarmer"
            v-if="isFarmer"
          >
            หน้าขายของ
          </v-list-item>

          <v-list-item variant="text" class="mx-2" @click="gotoIndex">
            ออกจากระบบ
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
import { computed } from 'vue'
import { useUserInfomation } from '@/composables/useInfomation'
const router = useRouter()
const route = useRoute()
const infomation = useUserInfomation()
const drawer = ref(false)
const searchState = inject(searchPluginSymbol)!
const showList = ['Index']
const isShowSearchBar = computed(() => showList.some((x) => x == route.name))
const isShowMenu = computed(() => showList.some((x) => x == route.name))
const isFarmer = false
const isLogin = Boolean(infomation.getInfomation.value != null)

function gotoregisterCust() {
  router.push({ path: '/registerCustomer' })
}
function gotologin() {
  router.push({ path: '/login' })
}
function gotopersonal() {
  router.push({ path: '/personal' })
}
function gotoregisterFarmer() {
  router.push({ path: '/registerFarmer' })
}
function gotoIndex() {
  infomation.deleteJwt()
  router.push({ path: '/' })
  window.location.reload()
}
</script>
@/composables/useInfomation
