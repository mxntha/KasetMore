import { ProductCard } from '@/components/productCard/interface'
import productApi from './useProductApi'
import userApi from './useUserApi'
import purchaseApi from './usePurchaseApi'
import categoryApi from './useCategoryApi'
import unitApi from './useUnitApi'

export interface Product extends ProductCard {}
export interface BasePurchase {
  purchaseId: string
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
export interface _BasePurchase extends BasePurchase {
  productId: string
}
export interface Purchase extends BasePurchase {
  product: Product
}
export interface Category {
  categoryName: string
  categoryDesc: string
}

export {
  productApi as useProductApi,
  userApi as useUserApi,
  purchaseApi as usePurchaseApi,
  categoryApi as useCategoryApi,
  unitApi as useUnitApi,
}
