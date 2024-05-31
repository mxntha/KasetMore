import { ProductCard } from '@/components/productCard/interface'
import { postMethod, getMethod, multpartFormData } from './baseApi'
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
        return []
      }
    },
    async getById(id: string) {
      try {
        return await getMethod<Product | null>(`${controller}/products/${id}`)
      } catch {
        return null
      }
    },
    async getByEmail(email: string) {
      try {
        return await getMethod<Product[]>(`${controller}/get-by-email`, {
          email: email,
        })
      } catch {
        return []
      }
    },
    async createProduct(files: File[], jsonData: any) {
      try {
        console.log('add-product', jsonData)

        return await multpartFormData(
          `${controller}/add-product`,
          files,
          jsonData
        )
      } catch {
        return null
      }
    },
  }
}
export default useProductApi
