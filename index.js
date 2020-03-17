import vLazyRefDirective from './src/directives/index';
import vLazyRefMixin from './src/mixins/index';

// this.$lazyRefs["ddd"]
const vLazyRefPlugin = {
	install(Vue) {
		Vue.directive('lazy-ref', vLazyRefDirective);
		Vue.mixin(vLazyRefMixin);
	},
}

export { vLazyRefPlugin, vLazyRefPlugin as default };
