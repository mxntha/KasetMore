<template>
   <v-card

class="mx-auto my-12"
max-width="374"
>
<template v-slot:loader="{ isActive }">
  <v-progress-linear
    :active="isActive"
    color="deep-purple"
    height="4"
    indeterminate
  ></v-progress-linear>
</template>

<v-img
  cover
  height="250"
  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
></v-img>

<v-card-item>
  <v-card-title>แตงโม</v-card-title>

  <v-card-subtitle>
    <span class="me-1">แนะนำ</span>

    <v-icon
      color="error"
      icon="mdi-fire-circle"
      size="small"
    ></v-icon>
  </v-card-subtitle>
</v-card-item>

<v-card-text>
  
  <v-row
    align="start"
    class="mx-0"
  >
  
    <v-rating
      :model-value="4.5"
      color="amber"
      density="compact"
      half-increments
      readonly
      size="small"
    ></v-rating>

    <div class="text-grey ms-4">
      4.5 (413)
    </div>
  </v-row>


  <div class="my-4 text-subtitle-1">
    สุพรรณบุรี
  </div>

  <div>พันธุ์ไทย ปลูกเอง ไม่มีสารเคมี</div>
</v-card-text>

<v-card-actions>
  <v-btn
    color="deep-purple-lighten-2"
    variant="text"

  >
    เพิ่มลงตะกร้า
  </v-btn>
  <v-btn
    color="deep-purple-lighten-2"
    variant="text"
    align = "and"
  >
    สั่งซื้อ
  </v-btn>
</v-card-actions>
</v-card>

    
  </template>
  
<script lang="ts" setup>
   
    
  
  
</script>