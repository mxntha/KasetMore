import { getMethod } from './baseApi'
import { UnitApiModel } from './interface'

export default function useUnitApi() {
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
