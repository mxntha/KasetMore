import { ProductCard } from '@/components/productCard/interface'
import productApi from './useProductApi'
import userApi from './useUserApi'
import categoryApi from './useCategoryApi'
import unitApi from './useUnitApi'
import transactionApi from './useTransactionApi'

export interface Product extends ProductCard {
  userEmail: string
  unitId: string
}
// export interface BasePurchase {
//   purchaseId: string
//   unit: string
//   amount: number
//   basePrice: number
//   total: number
//   userId: string
//   fee: number
//   dateCrated: string
//   dateSuccess: string
//   sellerId: string
// }
// export interface _BasePurchase extends BasePurchase {
//   productId: string
// }
// export interface Purchase extends BasePurchase {
//   product: Product
// }
export interface Category {
  categoryName: string
  categoryDesc: string
}

export {
  productApi as useProductApi,
  userApi as useUserApi,
  categoryApi as useCategoryApi,
  unitApi as useUnitApi,
  transactionApi as useTransactionApi,
}
