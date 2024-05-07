<template>
  <div class="regis">สมัครสมาชิกเกษตรกร</div>

  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text class="text-subtitle-1 text-medium-emphasis">
          ชื่อจริง
          <v-text-field
            v-model="registerfarmer.firstname"
            label=""
            placeholder="นาย/นาง/นางสาว"
            required
          ></v-text-field>

          นามสกุล
          <v-text-field
            v-model="registerfarmer.lastname"
            label=""
            placeholder=""
            required
          ></v-text-field>

          ที่อยู่
          <v-textarea
            v-model="registerfarmer.address"
            label=""
            placeholder="บ้านเลขที่ หมู่บ้าน หมู่ ซอย ตำบล อำเภอ จังหวัด"
            counter="50"
            required
          ></v-textarea>

          ชื่อบัญชีผู้ใช้
          <v-text-field
            v-model="registerfarmer.username"
            label=""
            placeholder=""
            required
          ></v-text-field>

          รหัสผ่าน
          <v-text-field
            v-model="registerfarmer.password"
            label="รหัสผ่านที่ใช้งาน"
            required
            placeholder="xxxxxx"
          ></v-text-field>

          เบอร์โทรศัพท์
          <v-text-field
            v-model="registerfarmer.phone"
            label="หมายเลขโทรศัพท์"
            required
            placeholder="08xxxxxxxx"
            counter="10"
          ></v-text-field>

          เลขบัตรประชาชน
          <v-text-field
            v-model="registerfarmer.idcard"
            label="13หลัก"
            required
            placeholder="xxxxxxxxxxxxx"
            counter="13"
          ></v-text-field>

          ชื่อร้านค้า
          <v-text-field
            v-model="registerfarmer.shop.shopname"
            label=""
            required
            placeholder="Kaset More"
          ></v-text-field>

          เบอร์โทรศัพท์ร้านค้า
          <v-text-field
            v-model="registerfarmer.shop.shopphone"
            label="หมายเลขโทรศัพท์ร้านค้า"
            required
            placeholder="0xxxxxxxxx(xxx)"
          ></v-text-field>

          ที่อยู่ร้านค้า
          <v-textarea
            v-model="registerfarmer.shop.shopaddress"
            label=""
            placeholder="บ้านเลขที่ หมู่บ้าน หมู่ ซอย ตำบล อำเภอ จังหวัด"
            counter="50"
            required
          ></v-textarea>
        </v-card-text>
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

      <div class="text-h6">You're all caught up.</div>

      <div class="text-medium-emphasis text-caption">
        Great job on completing all your tasks! This might be a good time to
        relax or consider planning your next set of goals. If you think of
        something new, just hit the button below to add a new task.
      </div>
    </v-card-text>
    <v-card-actions class="ma-2 pa-2 align-self-center">
      <v-btn  color="success" variant="tonal" size="large" @click="gotologin" >เข้าสู่ระบบ</v-btn>
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

//ตัวแปร
const registerfarmer = ref<RegisterFarmer>({
  firstname: '',
  lastname: '',
  address: '',
  username: '',
  password: '',
  phone: '',
  idcard: '',
  shop: {
    shopname: '',
    shopaddress: '',
    shopphone: '',
  },
})

const router = useRouter()
const openDialog = ref(false)



</script>

<style>
.regis {
  font-size: 70px;
  text-align: center;
}
</style>
