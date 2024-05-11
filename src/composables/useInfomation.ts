import { computed, ref } from 'vue'

interface UserInfomation {
  userName: string
  lastName: string
  firstName: string
  email: string
  userId: string
}

function useUserInfomation() {
  const info = ref<UserInfomation | null>(null)
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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwibmFtZSI6IkpvaG4iLCJsYXN0bmFtZSI6IkRvZSIsInVzZXJJZCI6IjEiLCJ1c2VyTmFtZSI6InRlc3QwMDEifQ.L0q4A8Fum7dQmQK7ydrvmXIoko_ZjMP3z-QffX7Hr7I',
      )
    else localStorage.setItem('login', jwt)
    setInfomation()
  }
  function decodeJWT(token: string): UserInfomation | null {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )

    return JSON.parse(jsonPayload)
  }
  function setInfomation() {
    const jwtString = getJwt()
    console.log('call user info')
    if (jwtString != null) info.value = decodeJWT(jwtString!)
    else info.value = null
  }
  return {
    getInfomation: computed(() => info.value),
    setJwt,
    getJwt,
    deleteJwt,
  }
}
export { useUserInfomation }
