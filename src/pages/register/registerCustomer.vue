<template>
  <div class="regis">สมัครสมาชิก</div>

  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text class="text-subtitle-1 text-medium-emphasis"
          >ชื่อจริง
          <v-text-field
            v-model="registerform.firstname"
            label=""
            placeholder="นาย/นาง/นางสาว"
            required
          ></v-text-field>
          นามสกุล
          <v-text-field
            class="text-subtitle-1 text-medium-emphasis"
            v-model="registerform.lastname"
            label=""
            placeholder=""
            required
          ></v-text-field>
          ที่อยู่
          <v-textarea
            v-model="registerform.address"
            label=""
            placeholder="บ้านเลขที่ หมู่บ้าน หมู่ ซอย ตำบล อำเภอ จังหวัด "
            counter="50"
            required
          ></v-textarea>
          ชื่อบัญชีผู้ใช้
          <v-text-field
            v-model="registerform.username"
            label=""
            placeholder=""
            required
          ></v-text-field>
          รหัสผ่าน
          <v-text-field
            v-model="registerform.password"
            label="รหัสผ่านที่ใช้งาน"
            required
            placeholder="xxxxxx"
          ></v-text-field>
          email
          <v-text-field
            v-model="registerform.email"
            label=""
            required
            placeholder="xxxxxx@gmail.com"
          ></v-text-field>
          เบอร์โทรศัพท์
          <v-text-field
            v-model="registerform.phone"
            label="หมายเลขโทรศัพท์"
            required
            placeholder="08xxxxxxxx"
            counter="10"
          ></v-text-field>
        </v-card-text>
        <v-col>
          <div class="file-input pt-6">
            <input
              type="file"
              name="file-input"
              id="file-input"
              class="file-input__input"
              @change="handleImageChange"
              accept="image/*"
            />
            <label class="file-input__label" for="file-input">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="upload"
                class="svg-inline--fa fa-upload fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
              <span>เพิ่มรูปภาพของตัวเอง</span></label
            >
          </div>
          <div v-if="imageUrl != ''">
            <img :src="imageUrl" width="200" />
          </div>
        </v-col>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn variant="text" @click="router.go(-1)"> ย้อนกลับ </v-btn>
          <v-spacer></v-spacer>

          <v-btn color="primary" variant="text" @click="openDialog = true">
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="openDialog" width="700" class="text-center">
    <v-card icon="$success">
      <div>
        <v-icon
          color="success"
          icon="mdi-check-circle-outline"
          size="120"
        ></v-icon>
      </div>
      <v-card-text>
        <div class="text-h4">สมัครสมาชิกเรียบร้อย!</div>

        <div class="text-h6"></div>

        <div class="text-medium-emphasis text-caption">
          โปรดทำการเข้าสู่ระบบเพื่อเข้าใช้งาน
        </div>
      </v-card-text>
      <v-card-actions class="ma-2 pa-2 align-self-center">
        <v-btn color="success" variant="tonal" size="large" @click="gotologin"
          >เข้าสู่ระบบ</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { type RegisterForm } from './interface'
import { useUserApi } from '@/composables/api'

//ตัวแปร
const registerform = ref<RegisterForm>({
  address: '',
  firstname: '',
  lastname: '',
  password: '',
  phone: '',
  username: '',
  email: '',
})

const router = useRouter()
const openDialog = ref(false)
const imageUrl = ref('')
const userApi = useUserApi()

function gotologin() {
  router.push({ name: 'Login' })
}

function handleImageChange(event: any) {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    convertToBase64(reader.result)
  }
  reader.readAsDataURL(file)
}

function convertToBase64(_imageUrl: any) {
  const img = new Image()
  img.src = _imageUrl
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    imageUrl.value = canvas.toDataURL('image/jpeg')
  }
}
</script>

<style>
.regis {
  font-size: 70px;
  text-align: center;
}
</style>
