<template>
  <v-layout class="mx-n8 my-n8">
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
              title="บัญชีผู้ใช้"
              value="Profile"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-box"
              title="ประวัติการซื้อ"
              value="Purchase"
            ></v-list-item>
            <v-divider :thickness="5" ></v-divider>
            <v-list-item
              prepend-icon="mdi-gavel"
              title="เกษตรกร"
              value="menu3"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-gavel"
              title="ขายสินค้า"
              value="menu4"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-gavel"
              title=""
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
    <v-main style="height: 900px">
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
function redirectMenu(_menuId: any) {
  if (_menuId == undefined) return
  menuId.value = _menuId
  if (_menuId == 'menu5') {
    alert(
      'ไปทำroute ให้ menu5 ด้วยยังไม่ได้ทำ ถ้าไม่เเก้มันจะพาไป menu1 ถ้าเเก้่เเล้วลบตรงนี้ด้วย',
    )
  }
  router.push({ name: `${_menuId}` })
}

</script>
