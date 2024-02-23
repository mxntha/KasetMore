<template>
<v-btn @click="gotoLogin">login</v-btn>

</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
    function gotoLogin(){router.push({path:"/login" })}
</script>