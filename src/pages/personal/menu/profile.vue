<template>
  <div v-if="userInfoData == null">loading . . .</div>
  <v-card v-else class="ma-8" height="835">
    <v-card-text>
      <v-container>
        <v-col class="d-flex justify-center">
          <v-avatar
            icon="mdi-account-circle"
            color="surface-variant"
            :image="userInfoData.profileUrl"
            size="150"
          ></v-avatar>

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
                <v-card prepend-icon="mdi-account" title="แก้ไขข้อมูลส่วนตัว">
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
        </v-col>
        <v-col class="d-flex text-h6">
          <div class="d-block align-self-center">
            <div class="d-flex pb-10 pt-16">
              <div class="pl-16 pr-5 text-blue-grey-darken-2">ชื่อ</div>
              <div class="pl-5">{{ userInfoData.name }}</div>
              <div class="pl-12 pr-5 text-blue-grey-darken-2">นามสกุล</div>
              <div class="pl-5">{{ userInfoData.lastName }}</div>
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
              <div class="pl-5">{{ userInfoData?.userId }}</div>
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
import { ref, inject } from 'vue'
const info = inject(contextPluginSymbol)!
const router = useRouter()
const userInfoData = ref<BaseUserInfo | null>(null)
;(async () => {
  if (info.userInfomation.value == null) {
    alert('ไม่พบข้อมูลผู้ใช้งาน')
    router.push({ path: '/' })
    return
  }
  userInfoData.value = info.userInfomation.value
})()
function gotoIndex() {
  // infomation.deleteJwt()
  router.push({ name: 'Index' })
}
</script>
