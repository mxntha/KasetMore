<template>
  <div class="d-flex justify-center align-center h-100 w-100">
    <v-card max-width="1200" rounded="lg">
      <div class="d-flex">
        <v-img
          cover
          width="700"
          src="../../../public/pikaso_texttoimage_Idyllic-country-landscape-showcasing-a-lush-vegeta.jpeg"
        ></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="500">
          <v-card-title class="text-h3 pb-6">Kaset More</v-card-title>
          <v-card-text>
            <form>
              <div class="text-subtitle-1 text-medium-emphasis">Email</div>
              <v-text-field
                density="compact"
                placeholder="ใส่ Email ของคุณ"
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
                class="mb-4"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="ใส่รหัสผ่านของคุณ"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                v-model="loginform.password"
                @click:append-inner="visible = !visible"
                autocomplete="on"
              ></v-text-field>
            </form>

            <v-btn
              :loading="loading"
              block
              class="mb-6"
              color="deep-purple"
              size="large"
              variant="tonal"
              rounded="xl"
              @click="gotoIndex"
            >
              เข้าสู่ระบบ
            </v-btn>
          </v-card-text>

          <v-card-action class="text-align">
            <div class="d-flex">
              <v-btn variant="text" @click="router.go(-1)"> ย้อนกลับ </v-btn>
              <v-spacer></v-spacer>
              <a
                class="text-blue text-decoration-none align-self-center"
                href="register?type=customer"
                rel="noopener noreferrer"
              >
                สมัครสมาชิก <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </div>
          </v-card-action>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
//
import { ref } from 'vue'
import { type LoginForm } from './interface'
import { useRouter } from 'vue-router'
import { useUserApi } from '@/composables/api'
const loading = ref(false)
const userApi = useUserApi()
const router = useRouter()
const visible = ref(false)
const loginform = ref<LoginForm>({
  username: '',
  password: '',
})
async function gotoIndex() {
  loading.value = true
  const jwt = await userApi.login(
    loginform.value.username,
    loginform.value.password
  )
  loading.value = false
  if (!jwt) {
    alert('รหัสผ่านผิด')
    return
  }
  router.push({ path: '/' })
}
</script>
<style scoped></style>
