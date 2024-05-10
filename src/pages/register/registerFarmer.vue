<template>
  <v-card class="ma-12">
    <v-card-item>
      <v-card-title class="regis"> สมัครสมาชิกเกษตรกร </v-card-title>
    </v-card-item>
    <v-divider class="mb-n1" />

    <v-card-text>
      <div class="font-weight-bold mb-2">ข้อมูลการลงเข้าใช้ระบบ</div>

      <v-row class="text-subtitle-1 text-medium-emphasis">
        <v-col cols="6">
          ชื่อบัญชีผู้ใช้
          <v-text-field
            v-model="registerfarmer.username"
            label=""
            placeholder=""
            required
          ></v-text-field>
        </v-col>
        <v-col>
          รหัสผ่าน
          <v-text-field
            v-model="registerfarmer.password"
            label="รหัสผ่านที่ใช้งาน"
            required
            placeholder="xxxxxx"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="font-weight-bold my-2">ข้อมูลส่วนตัว</div>
      <v-row class="text-subtitle-1 text-medium-emphasis">
        <v-col>
          ชื่อจริง
          <v-text-field
            v-model="registerfarmer.firstname"
            placeholder="นาย/นาง/นางสาว"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          นามสกุล
          <v-text-field
            v-model="registerfarmer.lastname"
            label=""
            placeholder=""
            required
          ></v-text-field>
        </v-col>
      </v-row>

      ที่อยู่
      <v-textarea
        v-model="registerfarmer.address"
        label=""
        placeholder="บ้านเลขที่ หมู่บ้าน หมู่ ซอย ตำบล อำเภอ จังหวัด"
        counter="50"
        required
      ></v-textarea>

      <v-row>
        <v-col>
          เลขบัตรประชาชน
          <v-text-field
            v-model="registerfarmer.idcard"
            label="13หลัก"
            required
            placeholder="xxxxxxxxxxxxx"
            counter="13"
          ></v-text-field>
        </v-col>
        <v-col>
          เลขหลังบัตรประชาชน
          <v-text-field
            v-model="registerfarmer.idcardLaser"
            label="12หลัก"
            required
            placeholder="xxxxxxxxxxxx"
            counter="12"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          เบอร์โทรศัพท์
          <v-text-field
            v-model="registerfarmer.phone"
            label="หมายเลขโทรศัพท์"
            required
            placeholder="08xxxxxxxx"
            counter="10"
          ></v-text-field>
        </v-col>
        <v-col>
          <div class="file-input">
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
      </v-row>
    </v-card-text>
    <v-divider class="mt-12" />

    <v-card-actions>
      <v-btn variant="text" @click="router.go(-1)"> ย้อนกลับ </v-btn>
      <v-spacer></v-spacer>

      <v-btn color="primary" variant="text" @click="openDialog = true">
        ตกลง
      </v-btn>
    </v-card-actions>
  </v-card>
  <div class="regis"></div>
  <v-dialog v-model="openDialog" width="700" class="text-center">
    <v-card icon="$success">
      <div>
        <v-icon
          color="warning"
          icon="mdi-check-circle-outline"
          size="120"
        ></v-icon>
      </div>
      <v-card-text>
        <div class="text-h4">รอผลการยืนยัน!</div>

        <div class="text-h6">การสมัครสมาชิกเกษตรกร.</div>

        <div class="text-medium-emphasis text-caption">
          รอการตรวจสอบผ่านบัญชีผู้ใช้
        </div>
      </v-card-text>
      <v-card-actions class="ma-2 pa-2 align-self-center">
        <v-btn color="info" variant="tonal" size="large" @click="gotoIndex"
          >หน้าแรก</v-btn
        >
        <v-btn
          color="success"
          variant="tonal"
          size="large"
          @click="gotoPersonal"
          >บัญชีผู้ใช้</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { type RegisterForm } from './interface'
import { type RegisterFarmer } from './interface'

function gotologin() {
  router.push({ path: '/login' })
}
function gotoIndex() {
  router.push({ path: '/' })
}
function gotoPersonal() {
  router.push({ path: '/personal' })
}

//ตัวแปร
const registerfarmer = ref<RegisterFarmer>({
  firstname: '',
  lastname: '',
  address: '',
  username: '',
  password: '',
  phone: '',
  idcard: '',
  idcardLaser: '',
})
const imageUrl = ref('')
const router = useRouter()
const openDialog = ref(false)
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

<style scoped>
.regis {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  padding: 10px 12px;
  background-color: #4245a8;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.file-input__label svg {
  height: 16px;
  margin-right: 4px;
}
</style>
