<template>
  <v-layout class="mx-n8 mt-n9">
    <v-navigation-drawer class="h-full" color="purple" theme="dark" permanent>
      <v-list color="transparent">
        <v-card
          append-icon="mdi-cancel"
          color="red"
          class="mx-auto"
          max-width="344"
          subtitle="การเป็นเกษตรกร"
          target="_blank"
          title="ไม่ผ่าน"
        >
        </v-card>
        <div class="mx-auto" max-width="300" color="purple">
          <v-list
            density="compact"
            :selected="[menuId]"
            @update:selected="(e) => redirectMenu(e[0])"
          >
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
            <v-divider :thickness="5"></v-divider>
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
            <v-divider :thickness="5"></v-divider>
            <v-list-subheader class="text-h5">Admin</v-list-subheader>
            <v-list-item
              prepend-icon="mdi-gavel"
              title="verify"
              value="Admin"
            ></v-list-item>
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
    <v-main class="h-100">
      <router-view />
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuId = ref(route.path.split('/').pop())
function gotoIndex() {
  router.push({ name: 'Index' })
  localStorage.removeItem('login')
  window.location.reload()
}
function gotoIndexLogin() {
  router.push({ name: 'Index' })
}
function redirectMenu(_menuId: any) {
  if (_menuId == undefined) return
  menuId.value = _menuId

  router.push({ name: `${_menuId}` })
}
</script>
