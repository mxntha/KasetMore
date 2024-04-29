<template>

<v-toolbar color="purple">
    <template v-slot:prepend>
      <div class="text-h5">Logo</div>
    </template>

    <v-divider
      class="ms-3"
      inset
      vertical
    ></v-divider>

    <v-toolbar-title>Kaset More</v-toolbar-title>

   <v-spacer></v-spacer>

   
   <v-card
    class="mx-auto"
    color="purple"
    max-width="600"
    style="width: 1000px">
    </v-card>

    <v-spacer></v-spacer>

    <v-toolbar-items>
    
    <v-divider vertical></v-divider>
        <v-btn @click="">เข้า</v-btn>

      <v-divider vertical></v-divider>

      <v-btn @click="">ตะกร้าของฉัน</v-btn>

      <v-divider vertical></v-divider>

     <v-menu>

    <template v-slot:activator="{ props }">
    
    <v-btn icon v-bind="props">
        <v-avatar icon="mdi-account" color="white"></v-avatar>
    </v-btn>
    </template>

      <v-card min-width="300">
        <v-list>
        <div class="d-flex align-center justify-space-around">
    <v-avatar color="info">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-avatar>
  </div>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            
              <v-btn variant="text" @click="gotopersonal">บัญชี</v-btn>
            
          </v-list-item>
          <v-btn variant="text" @click="gotoregisterFarmer">สมัครสมาชิกเกษตรกร</v-btn>
          <v-list-item>
            
          </v-list-item>
        </v-list>
        </v-card>
    </v-menu>
  </v-toolbar-items>

    <v-divider vertical></v-divider>
</v-toolbar>
  
<v-card flat>
    <v-card-title class="d-flex align-center pe-2">
        <v-icon 
        class="d-flex align-center"
        icon="mdi-cart"
        ></v-icon>&nbsp;
      รถเข็น

      <v-spacer></v-spacer>
      
      <v-text-field
        
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    
    </v-card-title>

    <v-divider></v-divider>

</v-card>

</template>

<script>

import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

function gotoregisterFarmer(){router.push({path:"/registerFarmer"})}
function gotopersonal(){router.push({path:"/personal"})}
</script>