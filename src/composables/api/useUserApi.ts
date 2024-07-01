import { postMethod, getMethod, multpartFormData } from './baseApi'
import { existInstance } from '@/plugins/context'
import { UserApiModel, SellerApiModel } from '@/composables/api/interface'
import { Product } from '.'

export interface InsertUser {
  Firstname: string
  lastName: string
  profileUrl?: string
  address: string
  DisplayName: string
  idCard?: string
  laserCard?: string
  phoneNumber: string
  password: string
  email: string
}
export interface UpdateUser {
  UserType: string
  Email: string
  Address: string
  LastName: string
  FirstName: string
  DisplayName: string
  ProfilePicture: string
  IsVerified: string
  PhoneNumber: string
}
export interface BaseUserInfo {
  userId?: string
  name: string
  lastName: string
  profileUrl?: string
  address: string
  userName: string
  idCard?: string
  laserCard?: string
  phoneNumber: string
  email: string
  userType: string
  statusType: string
}

export interface UserInfo extends BaseUserInfo {
  password: string
}

export interface SellerInfo {
  email: string
  firstName: string
  lastName: string
  profileUrl?: string
  userType: string
  address: string
  displayName: string
  password: string
  statusType: string
  laserCode?: string
  idCard?: string
  phoneNumber: string
  createDate: string
  createBy: string
  updateDate: string
  updateBy: string
  products: Product[]
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
    async resgisterUser(data: InsertUser, image: File | null) {
      try {
        return await multpartFormData(
          `${controller}/register`,
          !image ? [] : [image],
          data,
          'ProfilePicture'
        )
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
          userType: res.userType,
          profileUrl: res.profilePicture,
          statusType: res.isVerified,
        }
      } catch {
        return null
      }
    },
    async updateProfilePicture(email: string, file: File) {
      try {
        const updateImg = await multpartFormData(
          `${controller}/update-profile-picture`,
          [file],
          null,
          'file',
          {
            email: email,
          }
        )
        return updateImg
      } catch {
        return false
      }
    },
    async updateProfile(data: UpdateUser) {
      try {
        return await postMethod<boolean>(`${controller}/update-profile`, {
          ...data,
        })
      } catch {
        return false
      }
    },
    async updateVerifyFlag(email: string, VerifyStatus: string) {
      try {
        return await postMethod<boolean>(`${controller}/update-verify-flag`, {
          email: email,
          flag: VerifyStatus,
        })
      } catch {
        return false
      }
    },
    async userByUserType(
      userTypevalue: string,
      VerifyStatus: string
    ): Promise<SellerInfo[]> {
      try {
        const result = await postMethod<SellerApiModel[]>(
          `${controller}/user-by-usertype`,
          null,
          {
            userType: userTypevalue,
            verifiedStatus: VerifyStatus,
          }
        )
        return result.map((res) => {
          return {
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            address: res.address,
            phoneNumber: res.phoneNumber,
            displayName: res.displayName,
            userType: res.userType,
            profileUrl: res.profilePicture,
            statusType: res.isVerified,
            idCard: res.idNumber,
            laserCode: res.laserCode,
            password: res.password,
            createBy: res.createBy,
            createDate: res.createDate,
            updateBy: res.updateBy,
            updateDate: res.updateDate,
            products: res.products,
          }
        })
      } catch (error) {
        console.error('Error fetching users by user type:', error)
        return []
      }
    },
  }
}
export default useUserApi
