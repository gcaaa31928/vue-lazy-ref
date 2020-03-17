# vue-lazy-ref

[![Vue 2.x](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/vue-lazy-ref.svg)](https://www.npmjs.com/package/vue-lazy-ref)
[![npm-downloads](https://img.shields.io/npm/dm/vue-lazy-ref.svg)](https://www.npmjs.com/package/vue-lazy-ref)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/gcaaa31928/vue-lazy-ref/blob/master/LICENSE)

Easy to get ref even if the element present in async!

This is for `vue 2.x`

## Installing

Using npm:
```bash
npm install --save vue-lazy-ref
```

Using yarn:
```bash
yarn add vue-lazy-ref
```

## Usage

vue-lazy-ref can be used as a vue plugin.

### As a vue plugin
```js
var Vue = require('vue');
var vLazyRefPlugin = require('vue-lazy-ref');

Vue.use(vLazyRefPlugin)
```

## Started 

#### Normal case
```html
<template>
	<div>
		<div ref="test" v-lazy-ref="'test'" />
	</div>
</template>
<script>
export default {
	...
	methods: {
		async doAction() {
			const el = await this.$getLazyRefs('test');
			// you can get element here
		}
	}
</script>
```

#### Async case
```html
<template>
	<div v-if="show">
		<div ref="test" v-lazy-ref="'test'" />
		<button @click="show = !show" />
	</div>
</template>
<script>
export default {
	...
	data() {
		return {
			show: false
		};
	},
	methods: {
		async doAction() {
			 const el = await this.$getLazyRefs('test'); // you can get element here when element is present
		}
	}
</script>
```

```html
<template>
	<div v-if="show">
		<custom-comp ref="test" v-lazy-ref="'test'" />
		<button @click="show = !show" />
	</div>
</template>
<script>
export default {
	...
	data() {
		return {
			show: false
		};
	},
	methods: {
		async doAction() {
			 const comp = await this.$getLazyRefs('test'); // you can get component here when component is present
		}
	}
</script>
```

## License

MIT
