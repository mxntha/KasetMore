<template>
  <div class="regis">สมัครสมาชิก</div>

  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card
          class="mx-auto my-8"
          max-width="344"
          subtitle="เพื่อทำการลงขายสินค้าเกษตรกร และซื้อสินค้าเกษตรกร"
          title="สมัครสมาชิกเกษตรกร"
          @click="gotoregisterFarmer"
        ></v-card>

        <v-card
          class="mx-auto my-8"
          max-width="344"
          subtitle="เพื่อทำการซื้อสินค้าเกษตรกร"
          title="สมัครสมาชิกผู้ซื้อ"
          @click="gotoregisterCustomer"
        ></v-card>

        <v-btn
          block
          class="mb-8"
          color="red-darken-3"
          size="large"
          variant="tonal"
          rounded="xl"
          @click="router.go(-1)"
        >
          Cancel
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

function gotoregisterFarmer() {
  router.push({ path: '/registerFarmer' })
}
function gotoregisterCustomer() {
  router.push({ path: '/registerCustomer' })
}

const router = useRouter()
</script>
