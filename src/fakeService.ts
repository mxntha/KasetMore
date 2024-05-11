export interface UserInfo {
  name: string
  lastName: string
  profileUrl: string
  address: string
  userName: string
  password: string
  idCard?: string
  laserCard?: string
  phoneNumber: string
}

export default function services() {
  const userData: UserInfo[] = []
  function login(username: string, password: string) {
    return userData.find(
      (x) => x.userName == username && x.password == password
    )
  }
  return {
    login,
    userData,
  }
}
