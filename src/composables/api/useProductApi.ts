import { ProductCard } from '@/components/productCard/interface'
import { postMethod, getMethod, multpartFormData } from './baseApi'
import { Product, useCategoryApi, Category } from '.'
import { ProductResultApi, ProductDetailById } from './interface'

function useProductApi() {
  const controller = 'Product'
  return {
    async getAll(): Promise<Product[]> {
      try {
        const res = await getMethod<ProductResultApi[]>(
          `${controller}/products`
        )

        const ab = res.map((e) => {
          return {
            amount: e.amount,
            description: e.description,
            price: e.price,
            productId: e.productId.toString(),
            productName: e.productName,
            picture: e.productImages.length > 0 ? e.productImages[0].image : '',
            province: e.province,
            rating: e.rating,
            category: e.category,
          }
        })
        console.log('productall', ab)
        return ab
      } catch (ex) {
        console.log(ex)
        return []
      }
    },
    async getById(id: string) {
      try {
        return await getMethod<ProductDetailById | null>(
          `${controller}/products/${id}`
        )
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
            picture: e.productImages.length > 0 ? e.productImages[0].image : '',
            province: e.province,
            rating: e.rating,
            category: e.category,
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
    async getByCategory(category: string): Promise<Category[]> {
      try {
        console.log('get-by-category')

        const res = await postMethod<ProductDetailById[]>(
          `${controller}/products/get-by-category`,
          {
            category: category,
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
            categoryName: e.category,
            categoryDesc: e.category,
            catagoryImg: e.category,
          }
        })
      } catch (error) {
        console.error('Error get category:', error)
        return []
      }
    },
  }
}
export default useProductApi
