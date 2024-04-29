import { type Plugin, type InjectionKey, ref, computed } from 'vue'
export type PluginInstance = ReturnType<typeof $search>
export const searchPluginSymbol: InjectionKey<PluginInstance> = Symbol('$search')

function $search() {
    const searchTextState = ref('')
    function setSearchText(text:string) {
        searchTextState.value = text
    }
    return {
        searchText: computed(() => searchTextState.value),
        searchTextState,
        setSearchText,
    }
}

const plugin: Plugin = {
    install: (app, options) => {
        const sample = $search()
        app.provide(searchPluginSymbol, sample)
    }
}
export default plugin