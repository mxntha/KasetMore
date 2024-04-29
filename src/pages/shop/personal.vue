<template>
  <v-toolbar color="deep-purple">
    <template v-slot:prepend>
      <div class="text-h5">Logo</div>
    </template>

    <v-divider class="ms-3" inset vertical></v-divider>

    <v-toolbar-title>Kaset More</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-divider vertical></v-divider>
      <v-btn @click="gotoLogin">logincustomer</v-btn>

      <v-divider vertical></v-divider>

      <v-btn @click="gotoregisterFarmer">loginfarmer</v-btn>

      <v-divider vertical></v-divider>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar icon="mdi-account" color="white"></v-avatar>
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-item
              prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
              subtitle="Founder of Vuetify"
              title="John Leider"
            >
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-btn variant="text"> บัญชี </v-btn>
            </v-list-item>
            <v-btn variant="text"> ศูนย์ช่วยเหลือ </v-btn>
            <v-list-item> </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
    <v-divider vertical></v-divider>
  </v-toolbar>

  <v-card>
    <v-layout>
      <v-navigation-drawer color="purple" theme="dark" permanent>
        <v-list color="transparent">
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="ประวัติ"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-box"
            title="ที่อยู่"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-gavel"
            title="บัญชีธนาคาร&บัตร"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-gavel"
            title="การตั้งค่าความเป็นส่วนตัว"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-gavel"
            title="การตั้งค่าการแจ้งเตือน"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-gavel"
            title="ประวัติการซื้อ"
          ></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 900px"></v-main>
    </v-layout>
  </v-card>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

function gotoLogin() {
  router.push({ path: '/login' })
}
function gotoregisterFarmer() {
  router.push({ path: '/registerFarmer' })
}
function gotoaccount() {
  router.push({ path: '/account' })
}
</script>
