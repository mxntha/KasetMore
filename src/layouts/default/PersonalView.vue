<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" permanent>
      <v-list density="compact" nav dense>
        <v-list-item class="px-2 ma-0">
          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <div class="text-h6">
                <v-img :src="box" alt="Logo" width="50" height="50"></v-img>
              </div>
              <div class="text-h5 font-weight-bold ml-2">Kaset More</div>
            </div>
            <v-icon @click.stop="drawer = !drawer">mdi-close</v-icon>
          </div>
        </v-list-item>
        <v-list-item
          class="pa-0 ma-0 my-2"
          v-if="userInfoData.statusType != null"
        >
          <FarmerCard
            :status="
              userInfoData.userType == 'Seller' ? userInfoData.statusType : null
            "
          />
        </v-list-item>
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="ข้อมูลส่วนตัว"
              prepend-icon="mdi-account"
            ></v-list-item>
          </template>
          <v-list-item
            class="pa-0"
            prepend-icon="mdi-account"
            title="บัญชีผู้ใช้"
            :to="{ name: 'Profile' }"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-clipboard-text"
            title="ประวัติการซื้อ"
            :to="{ name: 'Purchase' }"
          ></v-list-item>
        </v-list-group>
        <v-list-group v-if="isFarmer">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="เกษตรกร"
              prepend-icon="mdi-account"
            ></v-list-item>
          </template>
          <v-list-item
            prepend-icon="mdi-chart-multiple"
            title="ยอดขาย"
            :to="{ name: 'Sales' }"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-store-plus"
            title="ขายสินค้า"
            :to="{ name: 'Products' }"
          ></v-list-item>
        </v-list-group>
        <v-list-group v-if="!isUser && isadmin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Admin"
              prepend-icon="mdi-account"
            ></v-list-item>
          </template>
          <v-list-item
            prepend-icon="mdi-shield-check"
            title="ตรวจสอบ"
            :to="{ name: 'Admin' }"
          ></v-list-item>
        </v-list-group>
      </v-list>
      <template v-slot:append>
        <v-list-item>
          <v-btn
            block
            color="primary"
            prepend-icon="mdi-home"
            @click="gotoIndexLogin"
          >
            หน้าแรก
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            block
            class="mb-3"
            color="error"
            prepend-icon="mdi-logout"
            @click="gotoIndex"
          >
            ออกจากระบบ
          </v-btn>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="green-accent-4" app dense fixed hide-on-scroll>
      <template v-slot:prepend v-if="!drawer">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <div
          class="text-h6 cursor-pointer"
          @click="router.push({ name: 'Index' })"
        >
          <v-img :src="box" alt="Logo" width="70" height="55"></v-img>
        </div>
      </template>
      <v-app-bar-title
        v-if="!drawer"
        class="cursor-pointer text-h5 font-weight-bold"
        @click="router.push({ name: 'Index' })"
        >Kaset More
      </v-app-bar-title>
    </v-app-bar>
    <v-main class="h-100 w-100 custom-bg">
      <div class="pa-8">
        <RouterView></RouterView>
      </div>
    </v-main>
  </v-app>
</template>
<script lang="ts" setup>
import box from '@/assets/box.png'
import { useRouter, useRoute } from 'vue-router'
import FarmerCard from '@/components/farmerCard/index.vue'
import { contextPluginSymbol } from '@/plugins/context'
import { onMounted } from 'vue'
import { useUserApi } from '@/composables/api'
import { BaseUserInfo } from '@/composables/api/useUserApi'
import { ref, watch, computed, inject } from 'vue'

const router = useRouter()
const route = useRoute()
const infomation = inject(contextPluginSymbol)!
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
onMounted(async () => {
  loading.value = true
  userInfoData.value =
    (await userApi.userByEmail(infomation.userInfomation.value?.email!)) ||
    defaultValue()
  loading.value = false
})
const userApi = useUserApi()
const loading = ref(true)
const userInfoData = ref<BaseUserInfo>(defaultValue())
const drawer = ref(true)
const group = ref(null)
const isFarmer = computed(
  () =>
    userInfoData.value!.userType == 'Seller' &&
    userInfoData.value!.statusType == 'Y'
)
const isUser = computed(
  () => infomation.userInfomation.value?.userType == 'User'
)
const isadmin = computed(
  () => infomation.userInfomation.value?.userType == 'Admin'
)

watch(
  () => group.value,
  () => {
    drawer.value = false
  }
)

const menuId = ref(
  route.path
    .split('/')
    .pop()!
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase())
)
function gotoIndex() {
  router.push({ name: 'Index' })
  infomation.resetInfomation()
  localStorage.removeItem('login')
  window.location.reload()
}
function gotoIndexLogin() {
  router.push({ name: 'Index' })
}
function redirectMenu(_menuId: any) {
  if (_menuId == undefined) return
  menuId.value = _menuId.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
    letter.toUpperCase()
  )

  router.push({ name: `${_menuId}` })
}
</script>
<style scoped>
.v-list-group__items .v-list-item {
  padding-inline-start: 16px !important;
}
.custom-bg {
  background-color: #f2e8cb;
}
.bg_menu {
  background-color: #f2e8cb !important;
}
</style>
