import { BaseUserInfo, UserInfo } from '@/composables/api/useUserApi'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useUserApi } from '@/composables/api'

import { type Plugin, type InjectionKey } from 'vue'
export type PluginInstance = Context
export const contextPluginSymbol: InjectionKey<PluginInstance> =
  Symbol('$context')

interface Context {
  getUserInfomation: () => Promise<void>
  userInfomation: ComputedRef<BaseUserInfo | null>
  resetInfomation: () => void
  setSessionLogin: (session: string) => void
  isFinishInit: Ref<boolean>
}

function context(): Context {
  const userInfo = ref<BaseUserInfo | null>(null)
  const userApi = useUserApi()
  const init = ref(false)
  // localStorage.setItem('login', jwt)
  function getJwt() {
    const temp = localStorage.getItem('login')
    return temp
  }
  function deleteJwt() {
    localStorage.removeItem('login')
    setInfomation()
  }
  async function setInfomation() {
    init.value = false
    try {
      const jwtString = getJwt()
      if (jwtString != null) {
        console.log('call user info')
        userInfo.value = await userApi.getUserInfomation()
      } else {
        userInfo.value = null
      }
    } catch {
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
      localStorage.removeItem('login')
      userInfo.value = null
    },
    userInfomation: computed(() => userInfo.value),
    setSessionLogin: (session: string) => {
      localStorage.setItem('login', session)
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
