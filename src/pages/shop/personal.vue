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
    title="ไม่ผ่าน">
    </v-card>
    <div
    class="mx-auto"
    max-width="300"
    color="purple"
    
  >
    <v-list density="compact" >
      
      <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="ประวัติ"
            value="item"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-box"
            title="ที่อยู่"
            value="item1"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-gavel"
            title="บัญชีธนาคาร&บัตร"
            value="item2"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-gavel"
            title="การตั้งค่าความเป็นส่วนตัว"
            value="item3"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-gavel"
            title="ประวัติการซื้อ"
            value="item4"
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
        <div class="text-h6 pt-15 ps-15">
          <v-avatar  icon="mdi-account-circle" color="surface-variant" size="80"></v-avatar>
      </div>
      <div></div>
    </v-main>
    </v-layout>
  
  
    
    
    
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()


function gotoIndex() {
  router.push({ path: '/' })
  localStorage.removeItem("login")
  window.location.reload()
}
function gotoregisterFarmer() {
  router.push({ path: '/registerFarmer' })
}
function gotoaccount() {
  router.push({ path: '/account' })
}
</script>
