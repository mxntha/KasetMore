<template>
  <v-card class="ma-8" height="835">
    <v-data-table :items="productData" :loading="loading">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn class="mb-2" color="primary" dark @click="dialogInsert = true">
            New Item
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn>
          <v-icon size="small" @click="dialogDelete = true">
            mdi-delete
          </v-icon>
        </v-btn>
        <v-icon color="red" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchProductData"> Reset </v-btn>
      </template>
      <template v-slot:item.picture="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img :src="item.picture" height="64" cover></v-img>
        </v-card>
      </template>
    </v-data-table>
  </v-card>
  <v-dialog v-model="dialogInsert" max-width="500px" v-if="currentProduct">
    <v-card>
      <v-card-title>
        <span class="text-h5">เพิ่มสินค้า</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <div class="file-input pt-6">
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  class="file-input__input"
                  @change="handleImageChange"
                  accept="image/*"
                />
                <label class="file-input__label" for="file-input">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="upload"
                    class="svg-inline--fa fa-upload fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                  <span>เพิ่มรูปภาพของตัวเอง</span></label
                >
              </div>
              <div v-if="imageUrl != ''">
                <img :src="imageUrl" width="200" />
              </div>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="currentProduct!.name"
                label="Dessert name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="currentProduct!.amount"
                label="Calories"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="currentProduct!.description"
                label="Fat (g)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogInsert = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogInsert = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5"
        >Are you sure you want to delete this item?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogDelete = false"
          >Cancel</v-btn
        >
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogDelete = false"
          >OK</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useProductApi, type Product } from '@/composables/api'
import { ref } from 'vue'
interface TableProduct extends Product {
  action: string
}
const loading = ref(true)
const imageUrl = ref('')
const imageFile = ref<File[]>([])
async function handleImageChange(event: any) {
  const file = event.target.files[0]
  for (let index = 0; index < 3; index++) {
    imageFile.value.push(file)
  }
  const res = await productApi.createProduct(imageFile.value, {})
  // const reader = new FileReader()

  // reader.onload = () => {
  //   console.log()
  //   console.log(typeof event.target.files[0])

  // }
  // reader.readAsDataURL(file)
}
const currentProduct = ref<TableProduct>()
const dialogInsert = ref(false)
const dialogDelete = ref(false)
function reInitProduct() {
  currentProduct.value = {
    action: '',
    amount: 0,
    description: '',
    id: '',
    name: '',
    picture: '',
    price: 0,
    province: '',
    rating: 0,
  }
}
const productApi = useProductApi()
async function fetchProductData() {
  reInitProduct()
  const res = await productApi.getAll()
  if (res != null) {
    productData.value = res.map((x) => {
      return {
        ...x,
        action: '',
      }
    })
  }
}
function editItem(product: TableProduct) {
  currentProduct.value = product
  dialogInsert.value = true
}
const productData = ref<TableProduct[]>([])
;(async () => {
  loading.value = true
  await fetchProductData()
  loading.value = false
})()
</script>
<style label="scss" scoped>
::v-deep(.v-table) {
  /* overflow-y: auto; */
  /* background-color: aqua; */
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  padding: 10px 12px;
  background-color: #4245a8;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.file-input__label svg {
  height: 16px;
  margin-right: 4px;
}
</style>
