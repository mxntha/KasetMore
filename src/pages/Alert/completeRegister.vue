<template>
  <br />
  <br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
    elevation="4"
    height="250"
    max-width="800"
    width="100%"
    rounded
  >
    <div>
      <h2 class="text-h4 font-weight-black text-orange">สมัครสมาชิกสำเร็จ!</h2>

      <div class="text-h5 font-weight-medium mb-2">
        คุณได้ทำการสมัครสมาชิก Kaset More เป็นที่เรียบร้อย!
      </div>

      <p class="text-body-2 mb-4">กรุณาเข้าสู่ระบบ เพื่อทำการเข้าใช้งาน</p>

      <v-btn color="orange" variant="text" @click="gotoIndex"
        >เข้าสู่ระบบ</v-btn
      >
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

function gotoIndex() {
  router.push({ path: '/' })
}
</script>
