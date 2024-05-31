import { postMethod, getMethod } from './baseApi'
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
  const infomation = existInstance!
  const controller = 'Auth'
  return {
    async login(username: string, password: string) {
      try {
        console.log('login . . . ')
        const res = await postMethod<
          | {
              jwt: string
              profilePicture: string
            }
          | any
        >(`${controller}/login`, { email: username, password })
        console.log('res', res.status)
        if (res == null) return false
        if (res.status == 400) return false
        infomation.setSessionLogin(JSON.stringify(res), res.profilePicture)
        return true
      } catch {
        return false
      }
    },
    async getUserInfomation(credential: string): Promise<BaseUserInfo | null> {
      console.log(credential)
      try {
        return await getMethod<BaseUserInfo>('getUserInfomation')
      } catch {
        return null
      }
    },
    async resgisterUser(data: InsertUser) {
      try {
        return await postMethod<boolean>(`${controller}/resgisterUser`, null)
      } catch {
        return false
      }
    },
    async checkJwt(jwt: string): Promise<boolean> {
      try {
        return await getMethod<boolean>('checkJwt')
      } catch {
        return false
      }
    },
    async userByEmail(emailvalue: string) {
      try {
        return await postMethod<boolean>(`${controller}/user-by-email`, {
          email: emailvalue,
        })
      } catch {
        return false
      }
    },
    async updateProfilePicture(data: InsertUser) {
      try {
        return await postMethod<boolean>(
          `${controller}/update-profile-picture`,
          null
        )
      } catch {
        return false
      }
    },
    async updateProfile(data: InsertUser) {
      try {
        return await postMethod<boolean>(`${controller}/update-profile`, null)
      } catch {
        return false
      }
    },
    async updateVerifyFlag(data: InsertUser) {
      try {
        return await postMethod<boolean>(
          `${controller}/update-verify-flag`,
          null
        )
      } catch {
        return false
      }
    },
  }
}
export default useUserApi
