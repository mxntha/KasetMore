<template>
  note ในปุ่มเเก้ไขเสร็จเเล้วหรือยัง <br />
  ต่อ api อะไรมาบ้าง <br />
  ข้อมูลไม่มีจะเเสดงหน้ายังไง เกิดอะไรขึ้นบ้าง <br />
  ปุ่มกดได้่ทุกอันไหม
  <v-card class="ma-8" height="835" :loading="loading">
    <v-card-text v-if="!loading">
      <v-container>
        <!-- User Profile Avatar and Edit Button -->
        <v-col class="d-flex justify-center">
          <div>
            <div class="d-flex justify-center">
              <v-avatar
                icon="mdi-account-circle"
                color="surface-variant"
                :image="infomation.userInfomation.value?.profilePicture"
                size="150"
              ></v-avatar>
            </div>

            <div class="pt-8">
              <v-dialog max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    class="text-none font-weight-regular"
                    prepend-icon="mdi-account-edit"
                    text="แก้ไขข้อมูลส่วนตัว"
                    variant="tonal"
                    v-bind="activatorProps"
                  ></v-btn>
                </template>
                <template v-slot:default="{ isActive: activator }">
                  <!-- Edit User Information Dialog -->
                  <v-card prepend-icon="mdi-account" title="แก้ไขข้อมูลส่วนตัว">
                    note <br />
                    ต่อ api การอัปเดตข้อมูล ส่งรูปภาพเเละข้อมูล <br />
                    ui เสร็จเเล้วหรือยัง <br />
                    password เช็คเหมือนกันหรือยัง <br />
                    ใน form ต้องกรอกอันไหนบ้าง ทำการตรวจเช็คหรือยัง
                    หากกรอกไม่ครบจะเกิดอะไรขึ้น <br />
                    หลังกด save หรือ cancel ใน form ต้องล้างค่าออกหรือไม่
                    หรือต้องดึงข้อมูลมาเเสดงอีกรอบไหม <br />
                    ข้อมูลไม่มีจะเเสดงหน้ายังไง เกิดอะไรขึ้นบ้าง
                    <v-card-text>
                      <v-row dense>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field
                            label="ชื่อบัญชีผู้ใช้งาน"
                            required
                            v-model="userInfoData.userName"
                            disabled
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="10" sm="8">
                          <v-text-field
                            hint="example of helper text only on focus"
                            label="Email"
                            v-model="userInfoData.email"
                            disabled
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" sm="6">
                          <v-text-field
                            label="รหัสผ่าน"
                            type="password"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" sm="6">
                          <v-text-field
                            label="ยืนยันรหัสผ่าน"
                            type="password"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="15">
                          <v-textarea
                            label="ที่อยู่"
                            required
                            v-model="userInfoData.address"
                          ></v-textarea>
                        </v-col>
                        <!-- Image Upload Field -->
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
                      </v-row>

                      <small class="text-caption text-medium-emphasis"
                        >*indicates required field</small
                      >
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        text="Close"
                        variant="plain"
                        @click="activator.value = false"
                      ></v-btn>

                      <v-btn
                        color="primary"
                        text="Save"
                        variant="tonal"
                        @click="activator.value = false"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </div>
        </v-col>
        <v-col class="d-flex text-h6">
          <div class="d-block align-self-center">
            <div class="d-flex pb-10 pt-16">
              <div class="pl-16 pr-5 text-blue-grey-darken-2">ชื่อ</div>
              <div class="pl-5">{{ userInfoData?.name }}</div>
              <div class="pl-12 pr-5 text-blue-grey-darken-2">นามสกุล</div>
              <div class="pl-5">{{ userInfoData?.lastName }}</div>
            </div>
            <div class="d-flex pb-10">
              <div class="pl-16 pr-5 text-blue-grey-darken-2">Email</div>
              <div class="pl-5">{{ userInfoData?.email }}</div>
              <div class="pl-16 pr-5 text-blue-grey-darken-2">
                เบอร์โทรศัพท์
              </div>
              <div class="pl-5">{{ userInfoData?.phoneNumber }}</div>
            </div>
            <div class="d-flex pb-10">
              <div class="pl-16 pr-5 text-blue-grey-darken-2">
                ชื่อบัญชีผู้ใช้
              </div>
              <div class="pl-5">{{ userInfoData?.userName }}</div>
            </div>
            <div class="d-flex pb-10">
              <div class="pl-16 pr-5 text-blue-grey-darken-2">ที่อยู่</div>
              <div class="pl-5">{{ userInfoData?.address }}</div>
            </div>
          </div>
        </v-col>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { contextPluginSymbol } from '@/plugins/context'
import { BaseUserInfo } from '@/composables/api/useUserApi'
import { useUserApi } from '@/composables/api'
import { ref, inject, onMounted } from 'vue'
const info = inject(contextPluginSymbol)!
const loading = ref(true)

const router = useRouter()

const userInfoData = ref<BaseUserInfo>({
  address: '',
  email: '',
  isFarmer: false,
  lastName: '',
  name: '',
  phoneNumber: '',

  userName: '',
  idCard: '',
  laserCard: '',
  profileUrl: '',
})

const imageUrl = ref('')
const infomation = inject(contextPluginSymbol)!
const userApi = useUserApi()
;(async () => {
  loading.value = true
  if (info.userInfomation.value == null) {
    alert('ไม่พบข้อมูลผู้ใช้งาน')
    router.push({ path: '/' })
    return
  }
  userInfoData.value = (await userApi.getUserInfomation(
    info.userInfomation.value?.email || ''
  )) || {
    address: '',
    email: '',
    isFarmer: false,
    lastName: '',
    name: '',
    phoneNumber: '',
    userName: '',
    idCard: '',
    laserCard: '',
    profileUrl: '',
  }
  console.log(userInfoData.value)
  loading.value = false
})()
onMounted(async () => {
  console.log() // false
  loading.value = true
  // currentProduct.value =
  userInfoData.value = (await userApi.userByEmail(
    infomation.userInfomation.value?.email!
  )) || {
    address: '',
    email: '',
    isFarmer: false,
    lastName: '',
    name: '',
    phoneNumber: '',
    userName: '',
    idCard: '',
    laserCard: '',
    profileUrl: '',
  }

  loading.value = false
})
function gotoIndex() {
  // infomation.deleteJwt()
  router.push({ name: 'Index' })
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
