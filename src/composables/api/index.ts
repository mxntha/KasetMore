import { ProductCard } from '@/components/productCard/interface'
import productApi from './useProductApi'
import userApi from './useUserApi'
export interface Product extends ProductCard {}
export { productApi as useProductApi, userApi as useUserApi }
