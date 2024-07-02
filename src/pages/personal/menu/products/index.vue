<template>
  <v-card class="h-100">
    <v-card-text>
      <TableProduct
        :data-table="productData"
        :loading="loading"
        @refresh-data="onTableRefresh"
        @create-product="onTableCreate"
        @delete-product="onTableDelete"
        @edit-product="onTableEdit"
      />
    </v-card-text>
  </v-card>
  <DialogProduct
    :open="openDialog"
    :product-id="productEditId"
    @add-product="saveProduct"
    @cancel="
      () => {
        openDialog = false
        productEditId = null
      }
    "
    @edit-product="saveEdit"
  />
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 text-center mt-3"
        >ยืนยันการลบสินค้า ?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="
            () => {
              dialogDelete = false
              productDeleteId = null
            }
          "
          >ยกเลิก</v-btn
        >
        <v-btn color="blue-darken-1" variant="text" @click="confirmDelete"
          >ตกลง</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useProductApi, type Product } from '@/composables/api'
import { ref, onMounted, inject } from 'vue'
import { contextPluginSymbol } from '@/plugins/context'
import TableProduct from '@/pages/personal/menu/products/table.vue'
import { toast } from 'vue3-toastify'
import DialogProduct, {
  FileImage,
} from '@/pages/personal/menu/products/dialogInsertAndEdit.vue'
const infomation = inject(contextPluginSymbol)!
const openDialog = ref(false)
const productEditId = ref<string | null>(null)
const productDeleteId = ref<string | null>(null)
const dialogDelete = ref(false)

const productApi = useProductApi()
const productData = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {
  await fetchProductData()
})

function onTableEdit(productId: string) {
  console.log(toast)
  console.log(productId)
  productEditId.value = productId
  openDialog.value = true
}
function onTableDelete(productId: string) {
  productDeleteId.value = productId
  dialogDelete.value = true
}
function onTableCreate() {
  openDialog.value = true
}
async function onTableRefresh() {
  await fetchProductData()
}

//บันทึกข้อมูลสินค้าที่เพิ่ม เช็คข้อความและตัวเลข
async function saveProduct({
  product,
  images,
}: {
  product: Product
  images: FileImage[]
}) {
  try {
    const res = await productApi.createProduct(
      images.map((x) => x.file),
      {
        ProductName: product.productName,
        Province: product.province,
        Rating: product.rating,
        Amount: Number(product.amount),
        UserEmail: infomation.userInfomation.value?.email!,
        Price: Number(product.price),
        Description: product.description,
        Category: product.category,
      }
    )
    toast.success('เพิ่มสินค้าสำเร็จ')
  } catch (error) {
    toast.error('เกิดข้อผิดพลาด')
  }
  openDialog.value = false
  productEditId.value = null
  await fetchProductData() // Refresh product data
}

// บันทึกการแก้ไขข้อมูล
async function saveEdit({
  product,
  images,
  imageProductDelete,
}: {
  product: Product
  images: FileImage[]
  imageProductDelete: number[]
}) {
  try {
    if (imageProductDelete.length > 0) {
      const res = await productApi.deleteProductImages(imageProductDelete)
      console.log(res)
    }
  } catch {
    toast.error('เกิดข้อผิดพลาดในการลบรูป')
  }
  try {
    const res = await productApi.updateProduct(
      images.map((x) => x.file),
      {
        ProductId: product.productId,
        ProductName: product.productName,
        Province: product.province,
        Amount: Number(product.amount),
        UserEmail: infomation.userInfomation.value?.email!,
        Price: Number(product.price),
        Description: product.description,
        Category: product.category,
      }
    )
    if (res) {
      toast.success('เเก้ไขสำเร็จ')
    } else {
      toast.error('เกิดข้อผิดพลาด')
    }
  } catch (error) {
    toast.error('เกิดข้อผิดพลาด')
  }
  openDialog.value = false
  productEditId.value = null
  fetchProductData()
}
async function confirmDelete() {
  const res = await productApi.deleteProduct(productDeleteId.value!.toString())
  await fetchProductData()
  dialogDelete.value = false
  toast.success('ลบสินค้าสำเร็จ')
}
async function fetchProductData() {
  loading.value = true
  const userEmail = await productApi.getByEmail(
    infomation.userInfomation.value?.email!
  )
  if (userEmail != null) {
    productData.value = userEmail.map((x) => {
      return {
        ...x,
        action: '',
      }
    })
  }
  loading.value = false
}
</script>

<style label="scss" scoped>
::v-deep(.v-table) {
  overflow-y: auto;
  /* background-color: aqua; */
}
</style>
