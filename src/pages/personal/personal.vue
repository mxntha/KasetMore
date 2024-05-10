<template>
  <v-layout class="mx-n4 mt-n6">
    <v-navigation-drawer color="purple" theme="dark" permanent>
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
          {{ menuId }}
          <v-list
            density="compact"
            :selected="[menuId]"
            @update:selected="(e) => redirectMenu(e[0])"
          >
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              title="ประวัติ"
              value="menu1"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-box"
              title="ที่อยู่"
              value="menu2"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-gavel"
              title="บัญชีธนาคาร&บัตร"
              value="menu3"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-gavel"
              title="การตั้งค่าความเป็นส่วนตัว"
              value="menu4"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-gavel"
              title="ประวัติการซื้อ"
              value="menu5"
            ></v-list-item>
          </v-list>
        </div>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="gotoIndex"> ออกจากระบบ </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main style="height: 600px">
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
  router.push({ path: '/' })
  localStorage.removeItem('login')
  window.location.reload()
}
function redirectMenu(_menuId: any) {
  if (_menuId == undefined) return
  menuId.value = _menuId
  if (_menuId == 'menu5') {
    alert(
      'ไปทำroute ให้ menu5 ด้วยยังไม่ได้ทำ ถ้าไม่เเก้มันจะพาไป menu1 ถ้าเเก้่เเล้วลบตรงนี้ด้วย',
    )
  }
  router.push({ path: `/personal/${_menuId}` })
}
function gotoregisterFarmer() {
  router.push({ path: '/registerFarmer' })
}
function gotoaccount() {
  router.push({ path: '/account' })
}
</script>
