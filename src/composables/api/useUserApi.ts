import { postMethod, getMethod } from './baseApi'
import fServices from '@/fakeService'
import { existInstance } from '@/plugins/context'
import { loginLocalStorageKey } from '@/plugins/context'
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
  isFarmer: boolean
}

export interface UserInfo extends BaseUserInfo {
  password: string
}

function useUserApi() {
  const fs = fServices()
  const infomation = existInstance!
  const controller = 'Auth'
  return {
    async login(username: string, password: string) {
      try {
        console.log('login . . . ')
        const res = await postMethod<{
          jwt: string
          profilePicture: string
        } | null>(`${controller}/login`, { email: username, password })
        if (res == null) return false
        infomation.setSessionLogin(JSON.stringify(res), res.profilePicture)
        return true
      } catch {
        const res = fs.login(username, password)
        console.log(res, 'sdsdsd')
        infomation.setSessionLogin(JSON.stringify(res), res?.image || '')
        return res != null
      }
    },
    async getUserInfomation(credential: string): Promise<BaseUserInfo | null> {
      console.log(credential)
      try {
        return await getMethod<BaseUserInfo>('getUserInfomation')
      } catch {
        const res = fs.getUserInfomation(credential)
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
          isFarmer: res.isFarmer,
        }
      }
    },
    async resgisterUser(data: InsertUser) {
      try {
        return await postMethod<boolean>('resgisterUser', null)
      } catch {
        return fs.register(data)
      }
    },
    async checkJwt(jwt: string): Promise<boolean> {
      try {
        return await getMethod<boolean>('checkJwt')
      } catch {
        return true
      }
    },
  }
}
export default useUserApi
