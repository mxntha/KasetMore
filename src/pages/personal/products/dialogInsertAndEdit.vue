<template>
  <v-dialog
    persistent
    v-model="props.open"
    max-width="500px"
    v-if="currentProduct"
  >
    <v-card width="800">
      <v-card-title>
        <span class="text-h5"
          >{{ !props.productId ? 'เพิ่มสินค้า' : 'เเก้ไขสินค้า' }}
        </span>
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
          <v-col v-for="image in images">
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
        <v-btn color="blue-darken-1" variant="text" @click="emit('cancel')">
          ยกเลิก
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="submit">
          ตกลง
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { Product, useProductApi } from '@/composables/api'
import { PropType, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
const currentProduct = ref<Product | null>(null)
const productApi = useProductApi()
const deleteProductIds = ref<number[]>([])
export interface FileImage {
  id: string
  file: File
}
const imageFiles = ref<FileImage[]>([])
const images = ref<{ id: string; src: string }[]>([])
const emit = defineEmits<{
  (e: 'cancel'): void
  (
    e: 'add-product',
    { product, images }: { product: Product; images: FileImage[] }
  ): void
  (
    e: 'edit-product',
    {
      product,
      images,
    }: { product: Product; images: FileImage[]; imageProductDelete: number[] }
  ): void
}>()

const props = defineProps({
  productId: {
    type: String as PropType<string | null>,
    default: () => null,
  },
  open: {
    type: Boolean,
    default: () => false,
  },
})
function deleteImage(id: string) {
  deleteProductIds.value.push(parseInt(id))
  imageFiles.value = imageFiles.value.filter((image) => image.id !== id)
  images.value = images.value.filter((image) => image.id !== id)
}

function validateCurrentProduct(state: Product) {
  if (
    !state.productName ||
    !state.price ||
    !state.amount ||
    !state.description
  ) {
    toast.error('กรุณากรอกข้อมูลให้ครบ')
    return false
  }
  // ตรวจสอบว่ามีรูปภาพอย่างน้อย 1 รูป และไม่เกิน 4 รูป
  if (
    (imageFiles.value.length < 1 || imageFiles.value.length > 4) &&
    (images.value.length < 1 || images.value.length > 4)
  ) {
    toast.error('รูปภาพต้องมีอย่างน้อย 1 รูปเเละไม่เกิน 4 รูป')

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
function submit() {
  if (!validateCurrentProduct(currentProduct.value!)) return
  if (props.productId == null) {
    emit('add-product', {
      product: currentProduct.value!,
      images: imageFiles.value,
    })
  } else {
    emit('edit-product', {
      product: currentProduct.value!,
      images: imageFiles.value,
      imageProductDelete: deleteProductIds.value,
    })
  }
  deleteProductIds.value = []
  imageFiles.value = []
  currentProduct.value = null
}
async function handleImageChange(event: any) {
  if (imageFiles.value.length >= 4) {
    // showFileLimitDialog.value = true
    alert('รูปภาพเกินจำนวนที่จำกัด')
    return
  }
  const file = event.target.files[0]
  const id = (imageFiles.value.length + 1).toString()
  const clonedFile = new File([file], file.name, { type: file.type })
  imageFiles.value.push({ id: id, file: clonedFile })
  const reader = new FileReader()

  reader.onload = () => {
    images.value.push({ id, src: reader.result as string })
  }
  reader.readAsDataURL(file)
  event.target.value = null
}

async function getProduct() {
  if (props.productId == null) return
  const productById = await productApi.getById(props.productId as string)
  if (!productById) return
  currentProduct.value = {
    productId: productById.productId.toString(),
    productName: productById.productName,
    price: productById.price,
    amount: productById.amount,
    province: productById.province,
    category: productById.category,
    description: productById.description,
    picture: '',
    rating: productById.rating,
  }
  images.value = productById.productImages.map((image, index) => ({
    id: image.attatchmentId.toString(),
    src: image.image,
  }))
}
watch(
  () => props,
  async (e) => {
    console.log(e)
    imageFiles.value = []
    if (e.open && e.productId != null) {
      await getProduct()
    } else if (e.open && e.productId == null) {
      currentProduct.value = {
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
      images.value = []
      imageFiles.value = []
    }
  },
  { deep: true }
)
</script>
<style label="scss" scoped>
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
