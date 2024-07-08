<template>
  <v-app-bar color="green-accent-4" app dense fixed hide-on-scroll>
    <template v-slot:prepend>
      <div
        class="text-h6 cursor-pointer"
        @click="router.push({ name: 'Index' })"
      >
        <v-img :src="box" alt="Logo" width="70" height="55"></v-img>
      </div>
    </template>
    <v-app-bar-title
      class="cursor-pointer text-h5 font-weight-bold"
      @click="router.push({ name: 'Index' })"
      >Kaset More
    </v-app-bar-title>
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
    {{ infomation.userInfomation.value?.isverify }}
    <v-spacer></v-spacer>
    <div class="d-flex">
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
              :size="45"
              icon="mdi-account-circle"
              color="surface-variant"
              :image="userInfoData?.profileUrl"
            ></v-avatar>
            <span class="ml-2">
              {{ infomation.userInfomation.value?.displayName }}</span
            >
          </div>
        </div>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            variant="text"
            class="mx-2"
            prepend-icon="mdi-account"
            @click="gotoprofile"
          >
            บัญชี
          </v-list-item>

          <v-list-item
            variant="text"
            class="mx-2"
            prepend-icon="mdi-account-cowboy-hat"
            @click="gotoregisterFarmer"
            v-if="!isFarmer"
          >
            สมัครสมาชิกเกษตรกร
          </v-list-item>

          <v-list-item
            variant="text"
            class="mx-2"
            prepend-icon="mdi-logout"
            @click="gotoIndex"
          >
            ออกจากระบบ
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import box from '@/assets/box.png'

import { useRouter, useRoute } from 'vue-router'
import { searchPluginSymbol } from '@/plugins/search'
import { computed, ref, inject, onMounted } from 'vue'
import { contextPluginSymbol } from '@/plugins/context'
import { BaseUserInfo } from '@/composables/api/useUserApi'
import { useUserApi } from '@/composables/api'

const infomation = inject(contextPluginSymbol)!
const loading = ref(true)
const router = useRouter()
const route = useRoute()
const searchState = inject(searchPluginSymbol)!
const showList = ['Index']
const isShowSearchBar = computed(() => showList.some((x) => x == route.name))
const isShowMenu = computed(() => showList.some((x) => x == route.name))
const isLogin = computed(() => infomation.userInfomation.value != null)

function defaultValue(): BaseUserInfo {
  return {
    address: '',
    email: '',
    userType: '',
    lastName: '',
    name: '',
    phoneNumber: '',
    userName: '',
    idCard: '',
    laserCard: '',
    profileUrl: '',
    statusType: '',
  }
}

const isFarmer = computed(
  () =>
    infomation.userInfomation.value?.userType == 'Seller' ||
    infomation.userInfomation.value?.userType == 'Admin' ||
    (infomation.userInfomation.value?.userType == 'Seller' &&
      infomation.userInfomation.value?.isverify == 'N')
)

const userApi = useUserApi()

const userInfoData = ref<BaseUserInfo | null>(null)

onMounted(async () => {
  loading.value = true
  userInfoData.value = await userApi.userByEmail(
    infomation.userInfomation.value?.email || ''
  )
  console.log(userInfoData.value)
  loading.value = false
})

function gotoregisterCust() {
  router.push({ name: 'Register', query: { type: 'customer' } })
}
function gotologin() {
  router.push({ name: 'Login' })
}
function gotoprofile() {
  router.push({ name: 'Profile' })
}
function gotoregisterFarmer() {
  router.push({ name: 'Register', query: { type: 'farmer' } })
}
function gotoIndex() {
  infomation.resetInfomation()
  router.push({ name: 'Index' })
}
</script>
