import { ProductCard } from '@/components/productCard/interface'
import { postMethod, getMethod } from './baseApi'
import { Purchase } from '.'
export default function usePurchaseApi() {
  return {
    async getAll() {
      try {
        return await getMethod<Purchase[]>('Purchase all')
      } catch {
        return []
      }
    },
    async getById(id: string) {
      try {
        return await getMethod<Purchase | null>('Purchase one')
      } catch {
        return null
      }
    },
    async createProduct(jsonData: any) {
      try {
        return await postMethod('add-Purchase', jsonData)
      } catch {
        return null
      }
    },
  }
}
