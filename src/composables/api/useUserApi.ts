import { postMethod, getMethod } from './baseApi'
import fServices from '@/fakeService'
import { contextPluginSymbol } from '@/plugins/context'
import { inject } from 'vue'
export interface InsertUser {
  name: string
  lastName: string
  profileUrl?: string
  address: string
  userName: string
  idCard?: string
  laserCard?: string
  phoneNumber: string
  password: string
  email: string
}
export interface BaseUserInfo {
  userId: string
  name: string
  lastName: string
  profileUrl?: string
  address: string
  userName: string
  idCard?: string
  laserCard?: string
  phoneNumber: string
  email: string
}

export interface UserInfo extends BaseUserInfo {
  password: string
}

function useUserApi() {
  const fs = fServices()
  const infomation = inject(contextPluginSymbol)!
  return {
    async login(username: string, password: string) {
      try {
        const res = await getMethod<{
          userName: string
          userId: string
        } | null>('sa')
        infomation.setSessionLogin(JSON.stringify(res))
        return res != null
      } catch {
        const res = fs.login(username, password)
        infomation.setSessionLogin(JSON.stringify(res))
        return res != null
      }
    },
    async getUserInfomation(id: string): Promise<BaseUserInfo | null> {
      try {
        return await getMethod<BaseUserInfo>('sa')
      } catch {
        const res = fs.getUserInfomation(id)
        if (res == null) return null
        return {
          address: res?.address,
          lastName: res?.lastName,
          name: res?.name,
          phoneNumber: res?.phoneNumber,
          profileUrl: res?.profileUrl,
          userId: res?.userId,
          userName: res?.userName,
          idCard: res?.idCard,
          laserCard: res?.laserCard,
          email: res?.email,
        }
      }
    },
    async resgisterUser(data: InsertUser) {
      try {
        return await postMethod<boolean>('sa')
      } catch {
        return fs.register(data)
      }
    },
    async checkJwt(jwt: string): Promise<boolean> {
      try {
        return await getMethod<boolean>('sa')
      } catch {
        return true
      }
    },
  }
}
export default useUserApi
