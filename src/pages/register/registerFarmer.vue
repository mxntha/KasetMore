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
                
                v-model="registerfarmer.firstname"
                
                label="First Name"
                placeholder="John"
                required
              ></v-text-field>
  
              <v-text-field
                
                v-model="registerfarmer.lastname"
                
                label="Last Name"
                placeholder="John"
                required
              ></v-text-field>
  
              <v-textarea 
                
                v-model="registerfarmer.address"
                label="Address"
                placeholder="Snowy Rock Pl"
                counter="50"
                required
              ></v-textarea>
  
              <v-text-field
                
                v-model="registerfarmer.username"
                label="Username"
                placeholder="John"
                required
              ></v-text-field>
  
              <v-text-field
               
                v-model="registerfarmer.password"
                label="Password"
                required
                placeholder="xxxxxx"
              ></v-text-field>
  
              <v-text-field
                
                v-model="registerfarmer.phone"
                
                label="Phone"
                required
                placeholder="08xxxxxxxx"
                counter="10"
              ></v-text-field>

              <v-text-field
                
                v-model="registerfarmer.idcard"
                
                label="ID Card"
                required
                placeholder="xxxxxxxxxxxxx"
                counter="13"
              ></v-text-field>

              <v-text-field
                
                v-model="registerfarmer.shop.shopname"
                
                label="Shop name"
                required
                placeholder="Kaset More"
              ></v-text-field>

              <v-text-field
                
                v-model="registerfarmer.shop.shopphone"
                
                label="Shop Phone"
                required
                placeholder="0xxxxxxxxx(xxx)"
              ></v-text-field>
  
              <v-textarea 
                
                v-model="registerfarmer.shop.shopaddress"
                label="Shop Address"
                placeholder="Snowy Rock Pl"
                counter="50"
                required
              ></v-textarea>

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
  import { type RegisterFarmer } from './interface';
  
  //ตัวแปร
  const registerfarmer = ref<RegisterFarmer>({
    firstname : "",
    lastname : "",
    address : "",
    username : "",
    password : "",
    phone : "",
    idcard : "",
    shop : {
        shopname : "",
        shopaddress : "",
        shopphone : ""
    }
  })
   
  const router = useRouter()
  
  function submit (){
      console.log(registerfarmer.value)
      
    }
  
  
  </script>
  
  
  
  <style>
  .regis{
    font-size: 70px;
    text-align: center;
  
  }
  </style>