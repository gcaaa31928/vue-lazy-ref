class LazyRefsInfo {
	constructor() {
		this._lazyRefs = Object.create(null);
		this._resolvers = Object.create(null);
		this._elCache = Object.create(null);
	}
	getResolvers(refName) {
		return this._resolvers[refName];
	}
	removeResolver(refName) {
		if (this._resolvers[refName]) {
			delete this._resolvers[refName];
		}
	}
	removeElCache(refName) {
		if (this._elCache) {
			delete this._elCache[refName];
		}
	}
	runResolver(refName, el) {
		const resolver = this.getResolvers(refName);
		if (resolver) {
			resolver(el);
			this.removeResolver(refName);
		}
		this._elCache[refName] = el;
	}
	getLazyRefs(refName) {
		if (this._elCache[refName]) {
			return Promise.resolve(this._elCache[refName]);
		}
		if (!this._lazyRefs[refName]) {
			const defer = new Promise((resolve, reject) => {
				this._resolvers[refName] = resolve;
			});
			this._lazyRefs[refName] = defer;
		}
		return this._lazyRefs[refName];
	}
}

export default {
	created() {
		this._lazyRefsInfo = new LazyRefsInfo();
	},
	beforeDestroy() {
		this._lazyRefsInfo = null;
	},
	methods: {
		'$getLazyRefs'(refName) {
			return this._lazyRefsInfo.getLazyRefs(refName);
		}
	}
};
