import { ProductCard } from '@/components/productCard/interface'
import { postMethod, getMethod, multpartFormData } from './baseApi'
import { Product } from '.'
import { ProductResultApi } from './interface'

function useProductApi() {
  const controller = 'Product'
  return {
    async getAll(): Promise<Product[]> {
      try {
        const res = await getMethod<ProductResultApi[]>(
          `${controller}/products`
        )
        console.log(res)
        return res.map((e) => {
          return {
            amount: e.amount,
            description: e.description,
            price: e.price,
            productId: e.productId.toString(),
            productName: e.productName,
            picture: e.productImages[0].image,
            province: e.province,
            rating: e.rating,
          }
        })
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
    async getByEmail(email: string): Promise<Product[]> {
      try {
        const res = await getMethod<ProductResultApi[]>(
          `${controller}/get-by-email`,
          {
            email: email,
          }
        )
        console.log(res)
        return res.map((e) => {
          return {
            amount: e.amount,
            description: e.description,
            price: e.price,
            productId: e.productId.toString(),
            productName: e.productName,
            picture: e.productImages[0].image,
            province: e.province,
            rating: e.rating,
          }
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
    async deleteProduct(id: string): Promise<any> {
      try {
        console.log('delete-product')

        const response = await postMethod(
          `${controller}/delete-product`,
          [], // No files to upload for delete operation
          { id: id } // Sending ID as part of JSON data
        )

        return response
      } catch (error) {
        console.error('Error deleting product:', error)
        return null
      }
    },
  }
}
export default useProductApi
