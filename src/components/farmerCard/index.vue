<template>
  <v-card
    v-if="status != null"
    :append-icon="icon"
    :color="color"
    class="mx-auto"
    max-width="344"
    subtitle="การเป็นเกษตรกร"
    target="_blank"
    :title="text"
  >
    <template v-if="status === 'N'">
      <v-divider></v-divider>
      <v-card-text> ไม่พบเลขนี้ในกระทรวงเกษตรกร </v-card-text>
    </template>
  </v-card>
</template>
<script setup lang="ts">
import { computed, defineProps } from 'vue'
const props = defineProps<{
  status: string | null
}>()
const status = computed(() => props.status)
const icon = computed(() =>
  status.value == 'N'
    ? 'mdi-cancel'
    : status.value == 'P'
    ? 'mdi-information'
    : status.value == 'Y'
    ? 'mdi-check-circle'
    : ''
)
const color = computed(() =>
  status.value == 'N'
    ? '#990528'
    : status.value == 'P'
    ? '#FDD835'
    : status.value == 'Y'
    ? '#43A047'
    : ''
)
const text = computed(() =>
  status.value == 'N'
    ? 'ไม่ผ่าน'
    : status.value == 'P'
    ? 'รอตรวจสอบ'
    : status.value == 'Y'
    ? 'ผ่านการตรวจสอบ'
    : ''
)
</script>
