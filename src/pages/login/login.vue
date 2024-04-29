<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">บัญชีผู้ใช้</div>
      {{ loginform.username }}
      <v-text-field
        density="compact"
        placeholder="ใส่ชื่อผู้ใช้งาน"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="loginform.username"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        รหัสผ่าน

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          ลืมรหัสผ่าน?</a
        >
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="ใส่รหัสผ่านของคุณ"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        v-model="loginform.password"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will
          be temporarily locked for three hours. If you must login now, you can
          also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
        block
        class="mb-8"
        color="red-darken-3"
        size="large"
        variant="tonal"
        rounded="xl"
        @click="gotoaccountCust"
      >
        เข้าสู่ระบบ
      </v-btn>

      <v-card-text class="text-align">
        <v-btn variant="text" @click="gotoIndex"> ย้อนกลับ </v-btn>

        <a
          class="text-blue text-decoration-none"
          href="chooseRegister"
          rel="noopener noreferrer"
        >
          สมัครสมาชิก <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
//
import { ref } from 'vue'
import { type LoginForm } from './interface'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const visible = ref(false)
const loginform = ref<LoginForm>({
  username: '',
  password: '',
})

function login() {
  console.log(loginform.value)
}
function gotoIndex() {
  router.push({ path: '/' })
}
function gotoaccountCust() {
  router.push({ path: '/accountCust' })
}
</script>
