export default {
	inserted(el, { value }, vnode) {
		const context = vnode.context;
		if (!context._lazyRefsInfo) {
			return;
		}
		if (vnode.componentInstance) {
			context._lazyRefsInfo.runResolver(value, vnode.componentInstance);
		} else {
			context._lazyRefsInfo.runResolver(value, el);
		}
		return;
	},
	unbind(el, { value }, vnode) {
		const context = vnode.context;
		if (!context._lazyRefsInfo) {
			return;
		}
		context._lazyRefsInfo.removeElCache(value, el);
		return;
	}
};
