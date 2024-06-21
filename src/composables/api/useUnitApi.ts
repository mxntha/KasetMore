import { getMethod } from './baseApi'
import { UnitApiModel } from './interface'

export default function useUnitApi() {
  return {
    async getAll() {
      try {
        const unit = await getMethod<UnitApiModel[]>('Unit/units')
        console.log('unitApi', unit)
        return unit
      } catch {
        return []
      }
    },
  }
}
