import { InsertUser, UserInfo } from './composables/api/useUserApi'
import { userData } from './fakeDb'
export default function services() {
  function login(
    username: string,
    password: string,
  ): {
    email: string
    displayName: string
    image?: string
    userType: string
  } | null {
    console.log(username, password, userData)
    const user = userData.find(
      (x) => x.userName == username && x.password == password,
    )
    if (user)
      return {
        email: user.userName,
        displayName: user.userId,
        image: user.profileUrl,
        userType: 'admin',
      }
    return null
  }
  function getUserInfomation(credential: string) {
    return userData.find((x) => x.userName == credential) || null
  }
  function register(data: InsertUser) {
    if (
      userData.findIndex(
        (x) =>
          x.userName == data.userName ||
          x.idCard == data.idCard ||
          x.laserCard == data.laserCard ||
          x.phoneNumber == data.phoneNumber ||
          x.email == data.email,
      ) != -1
    )
      return false
    userData.push({
      address: data.address,
      lastName: data.lastName,
      name: data.name,
      password: data.password,
      phoneNumber: data.phoneNumber,
      userId: `user ${userData.length + 1}`,
      userName: data.userName,
      idCard: data.idCard,
      laserCard: data.laserCard,
      profileUrl: data.profileUrl,
      email: data.email,
      isFarmer: false,
    })
    console.log(userData)
    return true
  }
  return {
    login,
    getUserInfomation,
    register,
    userData,
  }
}
