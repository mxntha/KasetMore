<template>
  <v-card class="h-100">
    note <br />
    ui เรียบร้อยหรือยัง ปุ่มเพิ่มเเห้งๆไปไหม <br />

    <v-card-text>
      <v-data-table-virtual
        :items="productData"
        :loading="loading"
        :headers="headers"
      >
        <!-- ส่วนหัวของตาราง -->
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
        <!-- ส่วนการดำเนินการ -->
        <template v-slot:item.action="{ item }">
          <v-icon color="" class="mr-4" size="small" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <!-- ไม่มีข้อมูล -->
        <template v-slot:no-data>
          <div class="text-center">
            <div class="ma-6">
              <div class="d-flex justify-space-around">
                <v-icon
                  class="mt-16"
                  icon="mdi-archive-off"
                  size="200"
                  color="grey"
                ></v-icon>
              </div>
              <div class="d-flex justify-space-around text-grey">
                ไม่มีข้อมูลสินค้า
              </div>
            </div>
            <v-btn class="ma-6" color="primary" @click="fetchProductData"
              >Reset</v-btn
            >
          </div>
        </template>
        <!-- ส่วนของรูปภาพ -->
        <template v-slot:item.picture="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img :src="item.picture" height="64" cover></v-img>
          </v-card>
        </template>
        <!-- รายละเอียดสินค้า -->
        <template v-slot:item.description="{ item }">
          <div style="width: 800px">
            {{ item.description }}
          </div>
        </template>
      </v-data-table-virtual>
    </v-card-text>
  </v-card>
  <!-- เพิ่มสินค้า -->
  <v-dialog
    persistent
    v-model="dialogInsert"
    max-width="500px"
    v-if="currentProduct"
  >
    <v-card width="800">
      note <br />

      แก้รูปภาพ

      <v-card-title>
        <span class="text-h5">เพิ่มสินค้า </span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
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
              <v-text-field
                variant="outlined"
                v-model="currentProduct!.province"
                label="จังหวัด"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                variant="outlined"
                v-model="currentProduct!.category"
                label="ประเภท"
              ></v-text-field>
              <div class="file-input">
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
                  <span>เพิ่มรูปภาพของสินค้า</span>
                </label>
              </div>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-textarea
                variant="outlined"
                rows="4"
                v-model="currentProduct!.description"
                label="รายละเอียดสินค้า"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <!-- แสดงรูปภาพ -->
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
  <!-- แก้ไขสินค้า -->
  <v-dialog
    persistent
    v-model="dialogEdit"
    max-width="500px"
    v-if="currentProduct"
  >
    <v-card width="800">
      note <br />
      แก้รูปภาพ

      <v-card-title>
        <span class="text-h5"> แก้ไขสินค้า </span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
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
              <v-text-field
                variant="outlined"
                v-model="currentProduct!.province"
                label="จังหวัด"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                variant="outlined"
                v-model="currentProduct!.category"
                label="ประเภท"
              ></v-text-field>
              <div class="file-input">
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
                  <span>เพิ่มรูปภาพของสินค้า</span>
                </label>
              </div>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-textarea
                variant="outlined"
                rows="4"
                v-model="currentProduct!.description"
                label="รายละเอียดสินค้า"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6" sm="6"> </v-col>
          </v-row>
        </v-container>
        <v-row>
          <v-col v-for="image in productById?.productImages">
            <v-hover v-slot="{ isHovering, props }">
              <v-container class="position-relative">
                <v-img
                  v-bind="props"
                  cover
                  :src="image.image"
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
                    @click="deleteImage(image.attatchmentId.toString())"
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
        <v-btn color="blue-darken-1" variant="text" @click="dialogEdit = false">
          ยกเลิก
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveEdit">
          ตกลง
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ลบสินค้า -->
  <v-dialog persistent v-model="dialogDelete" max-width="500px">
    <v-card>
      note <br />

      ต่อ api หลังลบจะเกิดอะไรขึ้น หากสำเรํจจะเเจ้งเตือนไหม เเล้วถ้า error จะบอก
      user ไหม

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
import { ref, onMounted, inject } from 'vue'
import { contextPluginSymbol } from '@/plugins/context'
import { ProductDetailById } from '@/composables/api/interface'

interface TableProduct extends Product {
  action: string
}
const loading = ref(true)
const _imageFile = ref<{ id: string; file: File }[]>([])
const imageFiles = ref<{ id: string; src: string }[]>([])
const infomation = inject(contextPluginSymbol)!

const currentProduct = ref<TableProduct | null>(null)
const dialogInsert = ref(false)
const dialogDelete = ref(false)
const dialogEdit = ref(false)
const deleteProduct = ref(false)

const productApi = useProductApi()
const productById = ref<ProductDetailById | null>(null)
const productData = ref<TableProduct[]>([])

// จัดการการอัพโหลดรูปภาพ
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
// dialog สำหรับเพิ่มสินค้า
function openInsert() {
  reInitProduct()
  dialogInsert.value = true
}

// ลบรูปภาพที่อัพโหลดแล้ว
function deleteImage(id: string) {
  alert('ลบ')
  _imageFile.value = _imageFile.value.filter((image) => image.id !== id)
  imageFiles.value = imageFiles.value.filter((image) => image.id !== id)
}
function validateCurrentProduct(state: TableProduct) {
  if (
    !state.productName ||
    !state.price ||
    !state.amount ||
    !state.description
  ) {
    alert('กรุณากรอกข้อมูลให้ครบ')
    return false
  }
  // ตรวจสอบว่ามีรูปภาพอย่างน้อย 1 รูป และไม่เกิน 4 รูป
  if (_imageFile.value.length < 1 || _imageFile.value.length > 4) {
    alert('กรุณาอัปโหลดรูปภาพอย่างน้อย 1 รูป และไม่เกิน 4 รูป')
    return false
  }

  // ตรวจสอบว่าราคาสินค้าเป็นตัวเลข
  if (isNaN(Number(state.price))) {
    alert('กรุณากรอกราคาสินค้าให้ถูกต้อง')
    return false
  }

  // ตรวจสอบว่าจำนวนสินค้าเป็นตัวเลข
  if (isNaN(Number(state.amount))) {
    alert('กรุณากรอกจำนวนสินค้าให้ถูกต้อง')
    return false
  }
  return true
}
//บันทึกข้อมูลสินค้าที่เพิ่ม เช็คข้อความและตัวเลข
async function saveProduct() {
  if (currentProduct.value == null) return
  if (!validateCurrentProduct(currentProduct.value)) return
  try {
    const res = await productApi.createProduct(
      _imageFile.value.map((x) => x.file),
      {
        ProductName: currentProduct.value.productName,
        Province: currentProduct.value.province,
        Rating: currentProduct.value.rating,
        Amount: Number(currentProduct.value.amount),
        UserEmail: infomation.userInfomation.value?.email!,
        Price: Number(currentProduct.value.price),
        Description: currentProduct.value.description,
        Category: currentProduct.value.category,
      }
    )
    alert('บันทึกข้อมูลสำเร็จ')
  } catch (error) {
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
  dialogInsert.value = false
  fetchProductData()
}

// บันทึกการแก้ไขข้อมูล
async function saveEdit() {
  if (currentProduct.value == null) return
  if (!validateCurrentProduct(currentProduct.value)) return

  try {
    const res = await productApi.updateProduct(
      _imageFile.value.map((x) => x.file),
      {
        ProductId: currentProduct.value.productId,
        ProductName: currentProduct.value.productName,
        Province: currentProduct.value.province,
        Amount: Number(currentProduct.value.amount),
        UserEmail: infomation.userInfomation.value?.email!,
        Price: Number(currentProduct.value.price),
        Description: currentProduct.value.description,
        Category: currentProduct.value.category,
      }
    )
    if (res) {
      alert('อัปเดตข้อมูลสำเร็จ')
    } else {
      alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล')
    }
  } catch (error) {
    alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล')
  }
  dialogEdit.value = false
  fetchProductData()
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
    category: '',
  }
}

async function fetchProductData() {
  reInitProduct()
  const userEmail = await productApi.getByEmail(
    infomation.userInfomation.value?.email!
  )
  console.log(userEmail)
  if (userEmail != null) {
    productData.value = userEmail.map((x) => {
      return {
        ...x,
        action: '',
      }
    })
  }
}

// dialog สำหรับแก้ไขข้อมูล
async function editItem(product: TableProduct) {
  currentProduct.value = product
  productById.value = await productApi.getById(product.productId)
  if (productById.value) {
    // กำหนดค่าให้กับ currentProduct เพื่อให้แสดงในฟอร์มแก้ไข
    currentProduct.value = {
      productId: productById.value.productId.toString(),
      productName: productById.value.productName,
      price: productById.value.price,
      amount: productById.value.amount,
      province: productById.value.province,
      category: productById.value.category,
      description: productById.value.description,
      picture: '', // คุณอาจจะไม่ต้องการใช้นี่
      action: '',
      rating: productById.value.rating,
    }
    // กำหนดค่าให้กับ imageFiles เพื่อแสดงรูปภาพที่มีอยู่
    imageFiles.value = productById.value.productImages.map((image, index) => ({
      id: index.toString(),
      src: image.image,
    }))
  }
  dialogEdit.value = true
}

// ลบสินค้า
async function deleteItem(item: TableProduct) {
  const confirmed = confirm(`คุณต้องการลบ ${item.productName} ใช่หรือไม่?`)
  if (confirmed) {
    deleteProduct.value = await productApi.deleteProduct(item.productId)
  }
  fetchProductData()
}

//หน้าเว็บ
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
