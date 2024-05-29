import { Category } from '.'
import { getMethod } from './baseApi'

export default function useCategoryApi() {
  return {
    async getAll() {
      try {
        const res = await getMethod<Category[]>('Category/categories')
        console.log('resapi', res)
        return res
      } catch {
        return []
      }
    },
  }
}
