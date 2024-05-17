import { ProductCard } from '@/components/productCard/interface'
import { postMethod, getMethod } from './baseApi'
import { purchaseData } from '@/fakeDb'
import { Purchase } from '.'
export default function usePurchaseApi() {
  return {
    async getAll() {
      try {
        return await getMethod<Purchase[]>('Purchase all')
      } catch {
        return purchaseData
      }
    },
    async getById(id: string) {
      try {
        return await getMethod<Purchase>('Purchase one')
      } catch {
        return purchaseData.find((x) => x.purchaseId === id)
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
