<template>
  <v-card class="h-100 w-100" id="2" :loading="loading">
    <v-card-title class="font-weight-black"> ข้อมูลส่วนตัว </v-card-title>
    <v-card-text v-if="!loading">
      <v-container>
        <!-- User Profile Avatar and Edit Button -->
        <v-col class="d-flex justify-center">
          <div>
            <div class="d-flex justify-center">
              <v-avatar
                icon="mdi-account-circle"
                color="surface-variant"
                :image="userInfoData.profileUrl"
                size="200"
              ></v-avatar>
            </div>

            <div class="pt-8 pl-3">
              <v-dialog max-width="600" persistent v-model="dialog">
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
                    <v-card-text>
                      <v-row dense>
                        <v-col cols="12" md="6">
                          <v-text-field
                            label="ชื่อบัญชีผู้ใช้งาน"
                            required
                            v-model="userInfoData.userName"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            label="Email"
                            v-model="userInfoData.email"
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            label="เบอร์โทรศัพท์"
                            v-model="userInfoData.phoneNumber"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row dense>
                        <v-col cols="12">
                          <v-textarea
                            label="ที่อยู่"
                            required
                            v-model="userInfoData.address"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      <!-- Image Upload Field -->
                      <v-row dense>
                        <v-col class="d-flex justify-center">
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
                                width="45"
                                height="80"
                              >
                                <path
                                  fill="currentColor"
                                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                ></path>
                              </svg>
                              <span>เพิ่มรูปภาพของตัวเอง</span></label
                            >
                          </div>
                          <div
                            v-if="userInfoData.profileUrl != ''"
                            class="ma-4 ml-6"
                          >
                            <img :src="userInfoData.profileUrl" width="200" />
                          </div>
                        </v-col>
                      </v-row>

                      <small class="text-caption text-medium-emphasis"></small>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        text="ยกเลิก"
                        variant="plain"
                        @click="dialog = false"
                      ></v-btn>

                      <v-btn
                        color="primary"
                        text="ตกลง"
                        variant="tonal"
                        @click="saveForm"
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
import { BaseUserInfo, InsertUser } from '@/composables/api/useUserApi'
import { useUserApi } from '@/composables/api'
import { ref, inject, onMounted, computed } from 'vue'

const info = inject(contextPluginSymbol)!
const loading = ref(true)
const dialog = ref(false)

const password = ref('')
const showPassword = ref(false)
const confirmPassword = ref('')
const showConfirmPassword = ref(false)
const router = useRouter()

const userInfoData = ref<BaseUserInfo>({
  address: '',
  email: '',
  userType: '',
  lastName: '',
  name: '',
  phoneNumber: '',
  userName: '',
  idCard: '',
  laserCard: '',
  profileUrl: '',
  statusType: '',
})

const imageUrl = ref('')
const infomation = inject(contextPluginSymbol)!
const userApi = useUserApi()

const formErrors = ref<string[]>([])

const isFormValid = computed(() => {
  formErrors.value = []

  if (!userInfoData.value.address) formErrors.value.push('กรุณากรอกที่อยู่')
  if (!password.value) formErrors.value.push('กรุณากรอกรหัสผ่าน')
  if (password.value !== confirmPassword.value)
    formErrors.value.push('รหัสผ่านไม่ตรงกัน')
})
if (isFormValid) {
  // This condition is always true
  console.log('Form is valid')
}

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
    userType: '',
    lastName: '',
    name: '',
    phoneNumber: '',
    userName: '',
    idCard: '',
    laserCard: '',
    profileUrl: '',
    statusType: '',
  }
  console.log(userInfoData.value)
  loading.value = false
})()
onMounted(async () => {
  loading.value = true
  userInfoData.value = (await userApi.userByEmail(
    infomation.userInfomation.value?.email!
  )) || {
    address: '',
    email: '',
    userType: '',
    lastName: '',
    name: '',
    phoneNumber: '',
    userName: '',
    idCard: '',
    laserCard: '',
    profileUrl: '',
    statusType: '',
  }

  loading.value = false
})

function gotoIndex() {
  router.push({ name: 'Index' })
}
const imageUserUpload = ref<File | null>(null)
function handleImageChange(event: any) {
  const file = event.target.files[0]
  const bin = new File([file], file.name, { type: file.type })
  const arrayFile = [bin]
  const reader = new FileReader()
  imageUserUpload.value = arrayFile[0]

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
    userInfoData.value.profileUrl = canvas.toDataURL('image/jpeg')
  }
}

async function saveForm() {
  if (isFormValid) {
    try {
      const updateProfileResult = await userApi.updateProfile({
        Address: userInfoData.value.address,
        DisplayName: userInfoData.value.userName,
        Email: userInfoData.value.email,
        FirstName: userInfoData.value.name,
        IsVerified: userInfoData.value.statusType,
        LastName: userInfoData.value.lastName,
        PhoneNumber: userInfoData.value.phoneNumber,
        ProfilePicture: userInfoData.value.profileUrl || '',
        UserType: userInfoData.value.userType,
        IdNumber: userInfoData.value.idCard,
        LaserCode: userInfoData.value.laserCard,
      })

      if (imageUserUpload.value != null) {
        const updateProfilePictureResult = await userApi.updateProfilePicture(
          infomation.userInfomation.value?.email!,
          imageUserUpload.value
        )
      }

      dialog.value = false // Close the dialog

      // if (updateProfilePictureResult && updateProfileResult) {
      //   alert('ข้อมูลได้รับการบันทึกแล้ว')
      //   // Optionally clear values or fetch new data to update UI
      // } else {
      //   alert('การบันทึกข้อมูลไม่สำเร็จ')
      // }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    }
  } else {
    alert(`กรุณากรอกข้อมูลให้ครบถ้วน:\n${formErrors.value.join('\n')}`)
  }
}
</script>
<style label="scss" scoped>
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
  font-weight: 650;
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
