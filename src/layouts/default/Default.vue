<template>
  <v-app>
    <default-bar />
    <div class="mx-4 mt-10 mb-10 h-100">
      <default-view class="h-100" />
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
</script>
