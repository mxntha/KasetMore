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
              
              v-model="Fname"
              
              label="First Name"
              placeholder="John"
              required
            ></v-text-field>

            <v-text-field
              
              v-model="Lname"
              
              label="Last Name"
              placeholder="John"
              required
            ></v-text-field>

            <v-textarea 
              
              v-model="address"
              label="Address"
              placeholder="Snowy Rock Pl"
              counter="50"
              required
            ></v-textarea>

            <v-text-field
              
              v-model="Uname"
              label="Username"
              placeholder="John"
              required
            ></v-text-field>

            <v-text-field
             
              v-model="password"
              label="Password"
              required
              placeholder="xxxxxx"
            ></v-text-field>

            <v-text-field
              
              v-model="phone"
              
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

const router = useRouter()
const Fname = ref("")
const Lname = ref("")
const address = ref("")
const Uname = ref("")
const password = ref("")
const phone = ref("")

function submit (){
    console.log(`${Fname.value} and ${Lname.value} and ${address.value} and ${Uname.value}
    and ${password.value} and ${phone.value}`)
  }


</script>



<style>
.regis{
  font-size: 70px;
  text-align: center;

}
</style>