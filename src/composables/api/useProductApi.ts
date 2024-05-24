import { ProductCard } from '@/components/productCard/interface'
import { postMethod, getMethod, multpartFormData } from './baseApi'
import { productData } from '@/fakeDb'
import { Product } from '.'

function useProductApi() {
  const controller = 'Product'
  return {
    async getAll() {
      try {
        const res = await getMethod<Product[]>(`${controller}/products`)
        console.log(res)
        return res
      } catch {
        return productData
      }
    },
    async getById(id: string) {
      try {
        return await getMethod<Product>(`${controller}/products/${id}`)
      } catch {
        return productData.find((x) => x.productId === id)
      }
    },
    async createProduct(files: File[], jsonData: any) {
      try {
        console.log('add -rpodeu', jsonData)

        return await multpartFormData('add-product', files, jsonData)
      } catch {
        return null
      }
    },
  }
}
export default useProductApi
