<template>
  <v-card class="ma-8" height="835">
    <v-card-title>ตรวจสอบการสมัครสมาชิกเกษตรกร</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row style="height: 800px; overflow-y: auto">
        <v-col v-for="i in userInfoData" cols="12">
          <v-card height="150">
            <v-row>
              <v-col cols="2">
                <div class="d-flex justify-center ma-4">
                  <v-avatar
                    :image="userInfoData?.profileUrl"
                    size="100"
                  ></v-avatar>
                </div>
              </v-col>
              <v-col cols="8">
                <div class="d-flex">
                  <div class="ma-4">
                    ชื่อ-นามสกุล : {{ userInfoData?.name }}
                    {{ userInfoData?.lastName }}
                  </div>
                  <div class="ma-4">Email : {{ userInfoData?.email }}</div>
                </div>
                <div class="d-flex">
                  <div class="mr-4 ml-4">
                    เลขบัตรประชาชน : {{ userInfoData?.idCard }}
                  </div>
                  <div class="mr-4">
                    เลขหลังบัตรประชาชน : {{ userInfoData?.laserCard }}
                  </div>
                </div>
                <div class="ma-4">ที่อยู่ : {{ userInfoData?.address }}</div>
              </v-col>
              <v-col cols="2">
                <div class="mt-2">
                  <v-btn
                    class="text-none font-weight-regular"
                    color="green"
                    prepend-icon="mdi-check-circle"
                    text="ผ่านการตรวจสอบ"
                    variant="outlined"
                  ></v-btn>
                </div>
                <div class="mt-5">
                  <v-btn
                    class="text-none font-weight-regular"
                    color="red"
                    prepend-icon="mdi-close-circle"
                    text="ไม่ผ่านการตรวจสอบ"
                    variant="outlined"
                  ></v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { BaseUserInfo } from '@/composables/api/useUserApi'
import { contextPluginSymbol } from '@/plugins/context'
import { ref, inject } from 'vue'

const userInfoData = ref<BaseUserInfo | null>(null)
const imageUrl = ref('')
const router = useRouter()
const info = inject(contextPluginSymbol)!

userInfoData.value = info.userInfomation.value
</script>
