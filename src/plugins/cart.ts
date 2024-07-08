import { Product } from '@/composables/api'
import { type Plugin, type InjectionKey, ref, computed } from 'vue'
export type PluginInstance = ReturnType<typeof $cart>
export const cartPluginSymbol: InjectionKey<PluginInstance> = Symbol('$cart')

function $cart() {
  const products = ref<Product[]>([])
  const product = localStorage.getItem('cart')
  if (product != null) {
    products.value = JSON.parse(product) as Product[]
  } else {
    localStorage.setItem('cart', JSON.stringify(products.value))
  }
  function addProductToCart(product: Product) {
    if (products.value.some((x) => x.productId == product.productId)) {
      products.value.find((x) => x.productId === product.productId)!.amount +=
        product.amount
    } else {
      products.value.push(product)
    }
    localStorage.setItem('cart', JSON.stringify(products.value))
  }
  return {
    getCart: computed(() => products.value).value,
    addProductToCart,
  }
}

const plugin: Plugin = {
  install: (app, options) => {
    const sample = $cart()
    app.provide(cartPluginSymbol, sample)
  },
}
export default plugin
