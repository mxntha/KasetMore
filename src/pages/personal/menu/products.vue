<template>
  note <br />
  ต่อ api เเล้วหรือยัง <br />
  หากกดที่ card จะเกิดอะไรขึ้นไหม พาไปหน้าไหนเพิ่มไหม <br />
  หากไม่มีขั้อมูลสินค้าเลย จะเเสดงหน้ายังไง เกิดอะไรขึ้นบ้าง<br />
  ui เรียบร้อยหรือยัง ปุ่มเพิ่มเเห้งๆไปไหม <br />
  ปุ่มกดได้่ทุกอันไหม
  <v-card class="ma-8">
    <v-card-text>
      <v-data-table-virtual
        height="690"
        :items="productData"
        :loading="loading"
        :headers="headers"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>สินค้า</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn class="mb-2" color="primary" dark @click="openInsert">
              เพิ่มสินค้า
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon color="" class="mr-4" size="small" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="dialogDelete = true">
            mdi-delete
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
      </v-data-table-virtual>
    </v-card-text>
  </v-card>
  <v-dialog
    persistent
    v-model="dialogInsert"
    max-width="500px"
    v-if="currentProduct"
  >
    <v-card>
      note <br />
      ต่อ api เเล้วหรือยัง หลัง dialog เปิดควรดึงข้อมูลอีกรอบไหม<br />
      field ครบไหมตาม c# <br />
      ต่อ api สำหรับเเก้ไขหรือยัง <br />
      ต่อ api สำหรับเพิ้มข้อมูลหรือยัง <br />
      เช็ค field กรอกครบหรือหากไม่ครบจะเเสดงยังไง หากกรอกผิดประเภทเช่นราคา กรอก
      หกยส จะเกิดอะไรขึ้นไหม <br />
      หากเพิ่มหรือเเก้ไขไม่สำเร็จจะเเจ้้ง user ไหม หากเเจ้งจะบอกยังไง <br />
      ปุ่มกดได้่ทุกอันไหม
      <v-card-title>
        <span class="text-h5">{{
          isEdit ? 'แก้ไข้ข้อมูล' : 'เพิ่มสินค้า'
        }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                variant="outlined"
                v-model="currentProduct!.productId"
                label="รหัสสินค้า"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                variant="outlined"
                v-model="currentProduct!.productName"
                label="ชื่อสินค้า"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                variant="outlined"
                v-model="currentProduct!.price"
                label="ราคาสินค้า"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                variant="outlined"
                v-model="currentProduct!.amount"
                label="จำนวนสินค้า"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-textarea
                variant="outlined"
                rows="2"
                v-model="currentProduct!.description"
                label="รายละเอียดสินค้า"
              ></v-textarea>
            </v-col>
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
                  <span>เพิ่มรูปภาพของสินค้า</span></label
                >
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-row>
          <v-col v-for="image in imageFiles">
            <v-hover v-slot="{ isHovering, props }">
              <v-container class="position-relative">
                <v-img
                  v-bind="props"
                  cover
                  :src="image.src"
                  height="200"
                  class="mb-2"
                />
                <v-expand-transition>
                  <v-btn
                    v-bind="props"
                    v-if="isHovering"
                    color="error"
                    fab
                    small
                    class="position-absolute"
                    style="
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                    @click="deleteImage(image.id)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn></v-expand-transition
                >
              </v-container>
            </v-hover>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogInsert = false"
        >
          ยกเลิก
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveProduct">
          ตกลง
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog persistent v-model="dialogDelete" max-width="500px">
    <v-card>
      note <br />
      ต่อ api เเล้วหรือยัง <br />
      ต่อ api หลังลบจะเกิดอะไรขึ้น หากสำเรํจจะเเจ้งเตือนไหม เเล้วถ้า error จะบอก
      user ไหม <br />
      ui เรียบร้อยเเล้วหรือยัง <br />
      ปุ่มกดได้่ทุกอันไหม
      <v-card-title class="text-h5">ยืนยันการลบสินค้า ?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogDelete = false"
          >ยกเลิก</v-btn
        >
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogDelete = false"
          >ตกลง</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useProductApi, type Product } from '@/composables/api'
import { ImgHTMLAttributes } from 'vue'
import { ref } from 'vue'
interface TableProduct extends Product {
  action: string
}
const loading = ref(true)
const _imageFile = ref<{ id: string; file: File }[]>([])
const imageFiles = ref<{ id: string; src: string }[]>([])
async function handleImageChange(event: any) {
  if (imageFiles.value.length >= 4) {
    alert('เกิน 4 ไฟล?เเล้ว')
    return
  }
  const file = event.target.files[0]
  const id = (_imageFile.value.length + 1).toString()
  const clonedFile = new File([file], file.name, { type: file.type })
  _imageFile.value.push({ id: id, file: clonedFile })
  const reader = new FileReader()

  reader.onload = () => {
    imageFiles.value.push({ id, src: reader.result as string })
  }
  reader.readAsDataURL(file)
  event.target.value = null
}
const headers = [
  { title: 'รหัสสินค้า', value: 'productId' },
  { title: 'รูปภาพ', value: 'picture' },
  { title: 'ชื่อสินค้า', value: 'productName' },
  { title: 'ราคาสินค้า', value: 'price' },
  { title: 'จำนวนสินค้า', value: 'amount' },
  { title: 'จังหวัด', value: 'province' },
  { title: 'รายละเอียดสินค้า', value: 'description' },
  { title: 'ดำเนินการ', value: 'action' },
]
const currentProduct = ref<TableProduct>()
const dialogInsert = ref(false)
const dialogDelete = ref(false)
const isEdit = ref(false)
function openInsert() {
  reInitProduct()
  dialogInsert.value = true
}
function deleteImage(id: string) {
  alert('ลบ')
  _imageFile.value = _imageFile.value.filter((image) => image.id !== id)
  imageFiles.value = imageFiles.value.filter((image) => image.id !== id)
}
async function saveProduct() {
  const res = await productApi.createProduct(
    _imageFile.value.map((x) => x.file),
    {}
  )
  dialogInsert.value = false
}
function reInitProduct() {
  currentProduct.value = {
    action: '',
    amount: 0,
    description: '',
    productId: '',
    productName: '',
    picture: '',
    price: 0,
    province: '',
    rating: 0,
  }
  isEdit.value = false
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
  isEdit.value = true
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
  overflow-y: auto;
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
