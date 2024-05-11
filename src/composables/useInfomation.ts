import { UserInfo } from '@/composables/api/useUserApi'
import { computed, ComputedRef, ref } from 'vue'
import { useUserApi } from '@/composables/api'
interface IUserInformation {
  getInfomation: ComputedRef<UserInfo | null>
  setJwt: (jwt?: string) => void
  getJwt: () => string | null
  deleteJwt: () => void
  checkJwt: (jwt: string) => Promise<boolean>
  isLogin: ComputedRef<boolean>
}
function useUserInfomationApp(): IUserInformation {
  const info = ref<UserInfo | null>(null)
  const userApi = useUserApi()
  setInfomation()
  function getJwt() {
    const temp = localStorage.getItem('login')
    return temp
  }
  function deleteJwt() {
    localStorage.removeItem('login')
    setInfomation()
  }
  function setJwt(jwt?: string) {
    if (!jwt)
      localStorage.setItem(
        'login',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwibmFtZSI6IkpvaG4iLCJsYXN0bmFtZSI6IkRvZSIsInVzZXJJZCI6IjEiLCJ1c2VyTmFtZSI6InRlc3QwMDEifQ.L0q4A8Fum7dQmQK7ydrvmXIoko_ZjMP3z-QffX7Hr7I'
      )
    else localStorage.setItem('login', jwt)
    setInfomation()
  }
  function decodeJWT(token: string): UserInfo | null {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  }
  function setInfomation() {
    const jwtString = getJwt()
    console.log('call user info')
    if (jwtString != null) info.value = decodeJWT(jwtString!)
    else info.value = null
  }
  async function checkJwt() {
    return true
  }
  return {
    getInfomation: computed(() => info.value),
    setJwt,
    getJwt,
    checkJwt,
    deleteJwt,
    isLogin: computed(() => info.value != null),
  }
}
function _useUserInfomationApp(): IUserInformation {
  const userApi = useUserApi()
  const info = ref<UserInfo | null>(null)
  setInfomation()
  function getJwt() {
    const temp = localStorage.getItem('login')
    return temp
  }
  function deleteJwt() {
    localStorage.removeItem('login')
    setInfomation()
  }
  function setJwt(jwt?: string) {
    if (!jwt) return
    else localStorage.setItem('login', jwt)
    setInfomation()
  }
  function setInfomation() {
    try {
      const jwtString = getJwt()
      console.log('call user info')
      if (jwtString != null) info.value = JSON.parse(jwtString) as UserInfo
      else info.value = null
    } catch {
      deleteJwt()
      info.value = null
    }
  }
  async function checkJwt(jwt: string) {
    return await userApi.checkJwt(jwt)
  }
  return {
    getInfomation: computed(() => info.value),
    setJwt,
    getJwt,
    checkJwt,
    deleteJwt,
    isLogin: computed(() => info.value != null),
  }
}
const useUserInfomation: () => IUserInformation = _useUserInfomationApp
export { useUserInfomation }
