import { postMethod, getMethod } from './baseApi'
import fServices from '@/fakeService'
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
}

export interface UserInfo extends BaseUserInfo {
  password: string
}

function useUserApi() {
  const fs = fServices()
  return {
    async login(username: string, password: string) {
      try {
        return await getMethod<{
          userName: string
          userId: string
        } | null>('sa')
      } catch {
        return fs.login(username, password)
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
