import { ProductCard } from '@/components/productCard/interface'
import { postMethod, getMethod } from './baseApi'
import { productData } from '@/fakeDb'
interface Product extends ProductCard {}
function useProductApi() {
  return {
    async getAll() {
      try {
        return await getMethod<Product[]>('product all')
      } catch {
        return productData
      }
    },
    async getById(id: string) {
      try {
        return await getMethod<Product>('product one')
      } catch {
        return productData.find((x) => x.id === id)
      }
    },
    createProduct() {},
  }
}
export default useProductApi
