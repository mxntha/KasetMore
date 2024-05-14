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
    <div>
      <v-btn @click="gotologin" v-if="!isLogin">เข้าสู่ระบบ</v-btn>

      <v-divider vertical v-if="isShowMenu"></v-divider>

      <v-btn @click="gotoregisterCust" v-if="!isLogin">สมัครสมาชิก</v-btn>
      <v-divider vertical></v-divider>
    </div>

    <v-menu v-if="isShowMenu">
      <template v-slot:activator="{ props }">
        <div class="mx-4" v-if="isLogin">
          <div v-bind="props" class="cursor-pointer">
            <v-avatar
              icon="mdi-account-circle"
              color="surface-variant"
              :image="infomation.userInfomation.value?.profileUrl"
            ></v-avatar>
            <span class="ml-2">
              {{ infomation.userInfomation.value?.userName }}
            </span>
          </div>
        </div>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item variant="text" class="mx-2" @click="gotoprofile">
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
import { inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { searchPluginSymbol } from '@/plugins/search'
import { computed } from 'vue'
import { contextPluginSymbol } from '@/plugins/context'
import { ref } from 'vue'
import { BaseUserInfo } from '@/composables/api/useUserApi'
const infomation = inject(contextPluginSymbol)!

const router = useRouter()
const route = useRoute()
const searchState = inject(searchPluginSymbol)!
const showList = ['Index']
const isShowSearchBar = computed(() => showList.some((x) => x == route.name))
const isShowMenu = computed(() => showList.some((x) => x == route.name))
const isLogin = computed(() => infomation.userInfomation.value != null)
const isFarmer = false
const userInfoData = ref<BaseUserInfo | null>(null)

function gotoregisterCust() {
  router.push({ name: 'RegisterCustomer' })
}
function gotologin() {
  router.push({ name: 'Login' })
}
function gotoprofile() {
  router.push({ name: 'Profile' })
}
function gotoregisterFarmer() {
  router.push({ name: 'RegisterFarmer' })
}
function gotoIndex() {
  infomation.resetInfomation()
  router.push({ name: 'Index' })
}
</script>
