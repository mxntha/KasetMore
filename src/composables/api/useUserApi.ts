import { postMethod, getMethod } from './baseApi'
import { existInstance } from '@/plugins/context'
import { loginLocalStorageKey } from '@/plugins/context'
import { UserApiModel } from '@/composables/api/interface'

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
    async userByEmail(emailvalue: string): Promise<null | BaseUserInfo> {
      try {
        const res = await postMethod<UserApiModel>(
          `${controller}/user-by-email`,
          null,
          {
            email: emailvalue,
          }
        )
        return {
          name: res.firstName,
          lastName: res.lastName,
          email: res.email,
          address: res.address,
          phoneNumber: res.phoneNumber,
          userName: res.displayName,
          isFarmer: false,
          profileUrl: res.profilePicture,
        }
      } catch {
        return null
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
