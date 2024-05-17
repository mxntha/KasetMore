import { ProductCard } from '@/components/productCard/interface'
import productApi from './useProductApi'
import userApi from './useUserApi'
import purchaseApi from './usePurchaseApi'

export interface Product extends ProductCard {}
export interface Purchase {
  purchaseId: string
  productId: string
  unit: string
  amount: number
  basePrice: number
  total: number
  userId: string
  fee: number
  dateCrated: string
  dateSuccess: string
  sellerId: string
}
export {
  productApi as useProductApi,
  userApi as useUserApi,
  purchaseApi as usePurchaseApi,
}
