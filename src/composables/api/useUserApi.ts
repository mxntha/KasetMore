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
        const base64Url = res?.jwt.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
        )
        infomation.setSessionLogin(JSON.parse(jsonPayload))
        return res != null
      } catch {
        const res = fs.login(username, password)
        infomation.setSessionLogin(JSON.stringify(res))
        return res != null
      }
    },
    async getUserInfomation(): Promise<BaseUserInfo | null> {
      try {
        return await getMethod<BaseUserInfo>('getUserInfomation')
      } catch {
        const jwt = localStorage.getItem(loginLocalStorageKey)
        const res = fs.getUserInfomation(JSON.parse(jwt!).userId)
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
