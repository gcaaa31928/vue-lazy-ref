import vLazyRefDirective from './src/directives';
import vLazyRefMixin from './src/mixins';

// this.$lazyRefs["ddd"]
const vLazyRefPlugin = {
	install(Vue) {
		Vue.directive('lazy-ref', vLazyRefDirective);
		Vue.mixin(vLazyRefMixin);
	},
}

export { vLazyRefPlugin, vLazyRefPlugin as default };
