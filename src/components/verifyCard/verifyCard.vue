<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col v-for="i in VerifyData" cols="12">
          <div class="ma-2">
            <v-icon icon="mdi-store"></v-icon>
            <div class="pl-2">ชื่อเกษตรกร : {{}}</div>
            <div class="pl-2">เลขบัตรประชาชน : {{}}</div>
            <div class="pl-2">เลขหลังบัตรประชาชน : {{}}</div>
          </div>

          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { VerifyCard } from './interface'

const props = defineProps<{ VerifyData: VerifyCard }>()
</script>
