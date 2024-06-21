import { getMethod } from './api/baseApi'
import { UnitApiModel } from './api/interface'

export default function useCategoryApi() {
  return {
    async getAll() {
      try {
        const res = await getMethod<[UnitApiModel[]]>('Unit/units')
        console.log('resapi', res)
        return res
      } catch {
        return []
      }
    },
  }
}
