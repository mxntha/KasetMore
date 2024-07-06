<template>
  <div class="d-flex justify-center align-center h-100 w-100">
    <v-card width="1200" rounded="lg">
      <v-card-text>
        <v-container class="h-100 w-100 pa-0 ma-0">
          <v-row class="h-100 w-100 pa-0 ma-0">
            <v-col
              xl="6"
              xxl="6"
              md="6"
              cols="12"
              sm="12"
              class="d-flex justify-center"
            >
              <v-img
                cover
                style="height: 100%; width: 100%"
                src="@/assets/pikaso_texttoimage_Idyllic-country-landscape-showcasing-a-lush-vegeta.jpeg"
              ></v-img
            ></v-col>
            <v-col xl="6" xxl="6" md="6" cols="12" sm="12">
              <div class="mx-auto pa-12 pb-8" elevation="8" max-width="500">
                <div class="d-flex">
                  <v-img :src="box" alt="Logo" width="80" height="65"></v-img>
                </div>
                <v-card-title
                  class="text-h3 pb-6"
                  @click="router.push({ name: 'Index' })"
                >
                  Kaset More
                </v-card-title>
                <v-card-text>
                  <v-form v-model="valid">
                    <div class="text-subtitle-1 text-medium-emphasis">
                      Email
                    </div>
                    <v-text-field
                      :rules="[
                        (value) => {
                          if (value) return true

                          return 'กรุณากรอก E-mail '
                        },
                        (value) => {
                          if (/.+@.+\..+/.test(value)) return true

                          return 'กรุณาระบุ E-mail ให้ถูกต้อง '
                        },
                      ]"
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
                      :rules="[
                        (value) => {
                          if (value) return true

                          return 'กรุณากรอกรหัสผ่าน '
                        },
                      ]"
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
                  </v-form>

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
                    <v-btn variant="text" @click="router.go(-1)">
                      ย้อนกลับ
                    </v-btn>
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
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="headline"></v-card-title>
      <v-card-text> กรุณาตรวจสอบข้อมูลให้ถูกต้อง </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = false">ตกลง</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import box from '@/assets/box.png'
import { ref } from 'vue'
import { type LoginForm } from './interface'
import { useRouter } from 'vue-router'
import { useUserApi } from '@/composables/api'
const loading = ref(false)
const userApi = useUserApi()
const router = useRouter()
const visible = ref(false)
const valid = ref(false)
const dialog = ref(false)
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
    dialog.value = true
    return
  }
  const redirect = localStorage.getItem('redirect') || 'Index'
  const param = localStorage.getItem('param')
  if (param) {
    router.push({ name: redirect, params: JSON.parse(param) })
    return
  }
  router.push({ name: redirect })
}
</script>
<style scoped></style>
