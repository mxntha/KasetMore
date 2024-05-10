<template>Receipt : {{ route.params.receiptId }}</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
