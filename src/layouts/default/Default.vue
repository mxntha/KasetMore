<template>
  <v-app>
    <default-bar />
    <v-container fluid class="mt-6">
      <default-view class="h-100" />
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
</script>
