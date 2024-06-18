<template>
  <v-layout class="h-100">
    <v-navigation-drawer
      class="h-full"
      style="background-color: #cfbe99"
      permanent
    >
      <v-list color="transparent">
        <FarmerCard
          :status="
            userInfoData.userType == 'Seller' ? userInfoData.statusType : null
          "
        />

        <div class="mx-auto" max-width="300" color="purple">
          <v-list
            density="compact"
            :selected="[menuId]"
            @update:selected="(e) => redirectMenu(e[0])"
          >
            <div>
              <div>{{ isFarmer }}</div>
              <v-list-subheader class="text-h5">ข้อมูลส่วนตัว</v-list-subheader>
              <v-list-item
                prepend-icon="mdi-account"
                title="บัญชีผู้ใช้"
                value="Profile"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-clipboard-text"
                title="ประวัติการซื้อ"
                value="Purchase"
              ></v-list-item>
            </div>

            <v-divider :thickness="5"></v-divider>
            <div v-if="isFarmer">
              <v-list-subheader class="text-h5">เกษตรกร</v-list-subheader>
              <v-list-item
                prepend-icon="mdi-chart-multiple"
                title="ยอดขาย"
                value="Sales"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-store-plus"
                title="ขายสินค้า"
                value="Products"
              ></v-list-item>
            </div>
            <div v-if="!isUser">
              <div v-if="isadmin">
                <v-divider :thickness="5"></v-divider>
                <v-list-subheader class="text-h5">Admin</v-list-subheader>
                <v-list-item
                  prepend-icon="mdi-shield-check"
                  title="ตรวจสอบ"
                  value="Admin"
                ></v-list-item>
              </div>
            </div>
          </v-list>
        </div>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block prepend-icon="mdi-home" @click="gotoIndexLogin">
            หน้าแรก
          </v-btn>
        </div>
        <div class="pa-2">
          <v-btn block prepend-icon="mdi-logout" @click="gotoIndex">
            ออกจากระบบ
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main class="h-100 mx-8 py-8">
      <router-view />
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import { ref, computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FarmerCard from '@/components/farmerCard/index.vue'
import { contextPluginSymbol } from '@/plugins/context'
import { onMounted } from 'vue'
import { useUserApi } from '@/composables/api'
import { BaseUserInfo } from '@/composables/api/useUserApi'

const router = useRouter()
const route = useRoute()
const userApi = useUserApi()
const loading = ref(true)
const userInfoData = ref<BaseUserInfo>(defaultValue())
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
const infomation = inject(contextPluginSymbol)!
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

onMounted(async () => {
  loading.value = true
  userInfoData.value =
    (await userApi.userByEmail(infomation.userInfomation.value?.email!)) ||
    defaultValue()
  loading.value = false
})

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
