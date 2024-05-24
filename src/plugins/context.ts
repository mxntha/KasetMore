import { BaseUserInfo, UserInfo } from '@/composables/api/useUserApi'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useUserApi } from '@/composables/api'

import { type Plugin, type InjectionKey } from 'vue'
export const loginLocalStorageKey = 'logins'
export const imageLocalStorageKey = 'image'

export type PluginInstance = Context
export const contextPluginSymbol: InjectionKey<PluginInstance> =
  Symbol('$context')
interface JwtData {
  email: string
  displayName: string
  profilePicture: string
}
interface Context {
  getUserInfomation: () => Promise<void>
  userInfomation: ComputedRef<JwtData | null>
  resetInfomation: () => void
  setSessionLogin: (session: string, image: string) => void
  isFinishInit: Ref<boolean>
}

function context(): Context {
  const userInfo = ref<JwtData | null>(null)
  const userApi = useUserApi()
  const init = ref(false)
  // localStorage.setItem(loginLocalStorageKey, jwt)
  function getJwt() {
    const jwt = localStorage.getItem(loginLocalStorageKey)
    const image = localStorage.getItem(imageLocalStorageKey)

    return { jwt, image }
  }
  function deleteJwt() {
    localStorage.removeItem(loginLocalStorageKey)
    localStorage.removeItem(imageLocalStorageKey)
    setInfomation()
  }

  async function setInfomation() {
    init.value = false
    try {
      const { jwt, image } = getJwt()

      if (jwt != null && image != null) {
        console.log('call user info', jwt)
        try {
          const base64Url = jwt.split('.')[1]
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
          const res = JSON.parse(jsonPayload)
          userInfo.value = {
            displayName: res.displayName,
            email: res.email,
            profilePicture: image,
          }
        } catch {
          const res = JSON.parse(jwt)
          userInfo.value = {
            displayName: res.displayName,
            email: res.email,
            profilePicture: image,
          }
        }
      } else {
        userInfo.value = null
      }
    } catch (ex) {
      console.log(ex)
      deleteJwt()
      userInfo.value = null
    }
    init.value = true
  }
  // ;(async () => {
  //   if (userInfo.value == null) {
  //     console.log('call for init')
  //     await setInfomation()
  //   }
  // })()

  return {
    getUserInfomation: async () => {
      await setInfomation()
    },
    isFinishInit: init,
    resetInfomation: () => {
      localStorage.removeItem(loginLocalStorageKey)
      userInfo.value = null
    },
    userInfomation: computed(() => userInfo.value),
    setSessionLogin: (session: string, image: string) => {
      localStorage.setItem(loginLocalStorageKey, session)
      localStorage.setItem(imageLocalStorageKey, image)
      setInfomation()
    },
  }
}
let existInstance: Context | null = null
const plugin: Plugin = {
  install: (app, options) => {
    existInstance = context()
    app.provide(contextPluginSymbol, existInstance)
  },
}
export default plugin
export { existInstance }
