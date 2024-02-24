<template>
  <div
  class="regis"
  >
    Register 
  </div>
    
  <v-row justify="center">
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
      >
      
        <v-card ref="form">
          <v-card-text>
            <v-text-field
              
              v-model="registerform.firstname"
              
              label="First Name"
              placeholder="John"
              required
            ></v-text-field>

            <v-text-field
              
              v-model="registerform.lastname"
              
              label="Last Name"
              placeholder="John"
              required
            ></v-text-field>

            <v-textarea 
              
              v-model="registerform.address"
              label="Address"
              placeholder="Snowy Rock Pl"
              counter="50"
              required
            ></v-textarea>

            <v-text-field
              
              v-model="registerform.username"
              label="Username"
              placeholder="John"
              required
            ></v-text-field>

            <v-text-field
             
              v-model="registerform.password"
              label="Password"
              required
              placeholder="xxxxxx"
            ></v-text-field>

            <v-text-field
              
              v-model="registerform.phone"
              
              label="Phone"
              required
              placeholder="08xxxxxxxx"
              counter="10"
            ></v-text-field>


          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn variant="text"
            @click="router.go(-1)">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
           
            <v-btn
              color="primary"
              variant="text"
              @click="submit"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { type RegisterForm } from './interface'

//ตัวแปร
const registerform = ref<RegisterForm>({
  address : "",
  firstname : "",
  lastname : "",
  password : "",
  phone : "",
  username : ""
})
 
const router = useRouter()

function submit (){
    console.log(registerform.value)
  }


</script>



<style>
.regis{
  font-size: 70px;
  text-align: center;

}
</style>