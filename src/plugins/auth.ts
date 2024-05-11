import { type Plugin, type InjectionKey, ref, computed } from 'vue'
export type PluginInstance = ReturnType<typeof $auth>
export const authPluginSymbol: InjectionKey<PluginInstance> = Symbol('$auth')

function $auth() {
  const loginState = ref(false)
  function setLoginState(value: boolean) {
    loginState.value = value
  }
  return {
    isLogin: loginState,
    setLoginState,
  }
}

const plugin: Plugin = {
  install: (app, options) => {
    const sample = $auth()
    app.provide(authPluginSymbol, sample)
  },
}
export default plugin
