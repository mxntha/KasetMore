<template>
  <div class="container mb-n12">
    <div class="content" @click="router.push({ name: 'Index' })">
      <v-img :src="box" alt="Logo" width="70" height="60" class="mr-4"></v-img>
      <div class="title text-h3 font-weight-bold">Kaset More</div>
    </div>
  </div>
  <div class="d-flex justify-center align-center w-100 h-100">
    <v-card class="w-100">
      <v-card-item>
        <v-card-title class="regis"> สมัครสมาชิก{{ titleForm }} </v-card-title>
      </v-card-item>
      <v-divider class="mb-n1" />
      <v-card-text>
        <v-form v-model="valid">
          <div class="font-weight-bold mb-2">ข้อมูลการลงเข้าใช้ระบบ</div>

          <v-row class="text-subtitle-1 text-medium-emphasis">
            <v-col cols="6">
              ชื่อบัญชีผู้ใช้
              <v-text-field
                v-model="registerfarmer.username"
                label=""
                placeholder=""
                :rules="[
                  (value: any) => (value ? true : 'กรุณากรอก Username'),
                ]"
                required
                :disabled="isFarmer"
              ></v-text-field>
            </v-col>
            <v-col v-if="!isFarmer">
              รหัสผ่าน
              <v-text-field
                v-model="registerfarmer.password"
                label="รหัสผ่านที่ใช้งาน"
                required
                :rules="[(valuePassword:string | undefined) => (valuePassword ? true : 'กรุณากรอกรหัสผ่าน')]"
                placeholder="xxxxxx"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                @input:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col v-if="!isFarmer">
              ยืนยันรหัสผ่านรหัสผ่าน
              <v-text-field
                v-model="registerfarmer.confirmPassword"
                label="ยืนยันรหัสผ่าน"
                required
                :rules="[
                  (valueConfirmPassword: string | undefined) =>
                    valueConfirmPassword && valueConfirmPassword === registerfarmer.password
                      ? true
                      : 'รหัสผ่านไม่ตรงกัน',
                ]"
                placeholder="xxxxxx"
                :type="showConfirmPassword ? 'text' : 'password'"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showConfirmPassword = !showConfirmPassword"
                @input:append="showConfirmPassword = !showConfirmPassword"
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
                :disabled="isFarmer"
              ></v-text-field>
            </v-col>
            <v-col>
              นามสกุล
              <v-text-field
                v-model="registerfarmer.lastname"
                label=""
                placeholder=""
                required
                :disabled="isFarmer"
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
            :disabled="isFarmer"
          ></v-textarea>

          <v-row>
            <v-col v-if="isFarmer">
              เลขบัตรประชาชน
              <v-text-field
                v-model="registerfarmer.idcard"
                label="13หลัก"
                required
                placeholder="xxxxxxxxxxxxx"
                counter="13"
              ></v-text-field>
            </v-col>
            <v-col v-if="isFarmer">
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
            <v-col class="pr-16">
              Email
              <v-text-field
                v-model="registerfarmer.email"
                label=""
                required
                placeholder="xxxxxxxx@gmail.com"
                counter=""
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
                :disabled="isFarmer"
              ></v-text-field>
            </v-col>
            <v-col class="pr-16">
              เบอร์โทรศัพท์
              <v-text-field
                v-model="registerfarmer.phone"
                label="หมายเลขโทรศัพท์"
                required
                placeholder="08xxxxxxxx"
                counter="10"
                :rules="[validatePhone]"
                :disabled="isFarmer"
              ></v-text-field>
            </v-col>
            <v-col v-if="!isFarmer" class="d-flex align-self-start">
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
              <div class="mt-6 ml-2 d-flex" v-if="imageUrl != ''">
                <img :src="imageUrl" width="150" />
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider class="mt-2" />

      <v-card-actions>
        <v-btn variant="text" @click="router.push({ name: 'Index' })">
          ย้อนกลับ
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          variant="text"
          :disabled="!formComplete"
          @click="register"
        >
          ตกลง
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>

  <!-- <div class="regis"></div> -->
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
        <v-btn color="success" variant="tonal" size="large" @click="gotoProfile"
          >บัญชีผู้ใช้</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="userDialog" width="700" class="text-center">
    <v-card icon="$success">
      <v-card-text>
        <v-row class="d-flex align-center justify-center">
          <v-col class="d-flex justify-center" cols="auto">
            <v-icon
              color="success"
              icon="mdi-check-circle-outline"
              size="40"
            ></v-icon>
          </v-col>
          <v-col class="d-flex align-center" cols="auto">
            <span>สมัครสมาชิกเรียบร้อย</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import box from '@/assets/box.png'

import { ref, inject, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { type RegisterFarmer } from './interface'
import { useUserApi } from '@/composables/api'
import { onMounted } from 'vue'
import { BaseUserInfo } from '@/composables/api/useUserApi'
import { contextPluginSymbol } from '@/plugins/context'

const userApi = useUserApi()
const userData = ref<BaseUserInfo | null>(null)
const router = useRouter()
const route = useRoute()
const valid = ref(false)
const infomation = inject(contextPluginSymbol)!

const password = ref('')
const showPassword = ref(false)
const confirmPassword = ref('')
const showConfirmPassword = ref(false)

const isFarmer = computed(
  () => userData.value != null && route.query.type === 'farmer'
)

const titleForm = computed(() =>
  route.query.type === 'farmer' ? 'เกษตรกร' : 'บัญชีผู้ใช้งาน'
)
//ตรวจฟอร์ม
const formComplete = computed(() => {
  // const {
  //   firstname,
  //   lastname,
  //   address,
  //   username,
  //   password,
  //   confirmPassword,
  //   phone,
  //   email,
  // } = registerfarmer.value
  // if (
  //   !firstname ||
  //   !lastname ||
  //   !address ||
  //   !username ||
  //   !password ||
  //   !confirmPassword ||
  //   !phone ||
  //   !email
  // ) {
  //   return false
  // }
  // if (isFarmer.value) {
  //   if (!registerfarmer.value.idcard || !registerfarmer.value.idcardLaser) {
  //     return false
  //   }
  // }
  return true
})
//เช็คแบบเบอร์โทร
function validatePhone(value: string): boolean | string {
  const pattern = /^0[0-9]{9}$/
  if (value && pattern.test(value)) {
    return true
  }
  return 'กรุณาระบุหมายเลขโทรศัพท์ให้ถูกต้อง (รูปแบบ: 08xxxxxxxx)'
}

//ตัวแปร
const registerfarmer = ref<RegisterFarmer>({
  firstname: '',
  lastname: '',
  address: '',
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  idcard: '',
  idcardLaser: '',
  email: '',
})
async function register() {
  try {
    if (!formComplete.value) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    if (route.query.type === 'farmer') {
      // มาเช็คตรงนี้ด้วย handler error ถ้า api พังจะทำไรบ้าง

      await userApi.updateProfile({
        Address: registerfarmer.value.address,
        LastName: registerfarmer.value.lastname,
        FirstName: registerfarmer.value.firstname,

        PhoneNumber: registerfarmer.value.phone,
        ProfilePicture: imageUrl.value,
        DisplayName: registerfarmer.value.username,
        IdCard: registerfarmer.value.idcard,
        LaserCard: registerfarmer.value.idcardLaser,
        Email: registerfarmer.value.email,
        UserType: 'Seller',
        IsVerified: 'P',
      })

      const flag = await userApi.updateVerifyFlag(
        registerfarmer.value.email,
        'P'
      )
      console.log('error flag', flag)
      openDialog.value = true
    } else {
      const exist = await userApi.userByEmail(registerfarmer.value.email)
      if (!exist) {
        const res = await userApi.resgisterUser(
          {
            address: registerfarmer.value.address,
            lastName: registerfarmer.value.lastname,
            Firstname: registerfarmer.value.firstname,
            password: registerfarmer.value.password,
            phoneNumber: registerfarmer.value.phone,
            profileUrl: imageUrl.value,
            DisplayName: registerfarmer.value.username,
            idCard: registerfarmer.value.idcard,
            laserCard: registerfarmer.value.idcardLaser,
            email: registerfarmer.value.email,
          },
          imageUser.value
        )
        console.log(res)
        if (res) {
          userDialog.value = true
          setTimeout(() => {
            userDialog.value = false
            router.push({ name: 'Login' })
          }, 2000)
        } else {
          alert('เกิดข้อผิดพลาด')
        }
      } else {
        alert('อีเมลซ้ำ')
      }
    }
  } catch (ex) {
    console.log(ex)
    // alert('error')
  }
}

onMounted(async () => {
  if (
    !route.query.type ||
    !(route.query.type == 'farmer' || route.query.type == 'customer')
  ) {
    router.push({ name: 'Register', query: { type: 'farmer' } })
  }
  if (route.query.type == 'farmer') {
    userData.value = await userApi.userByEmail(
      infomation.userInfomation.value?.email!
    )
    if (userData.value == null) {
      alert('ไม่มีข้อมูลผู้ใช้')
      router.push({ name: 'Index' })
      return
    }
    registerfarmer.value.firstname = userData.value?.name
    registerfarmer.value.lastname = userData.value.lastName
    registerfarmer.value.address = userData.value.address
    registerfarmer.value.email = userData.value.email
    registerfarmer.value.phone = userData.value.phoneNumber
    registerfarmer.value.username = userData.value.userName
  }
})

const imageUrl = ref('')
const openDialog = ref(false)
const userDialog = ref(false)
const imageUser = ref<File | null>(null)
function handleImageChange(event: any) {
  const file = event.target.files[0]
  const reader = new FileReader()
  imageUser.value = new File([file], file.name, { type: file.type })

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
function gotologin() {
  router.push({ name: 'Login' })
}
function gotoIndex() {
  router.push({ name: 'Index' })
}
function gotoProfile() {
  router.push({ name: 'Profile' })
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  align-items: center;
  cursor: pointer;
}
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
