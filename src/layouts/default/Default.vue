<template>
  <v-app>
    <default-bar />
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
</script>
