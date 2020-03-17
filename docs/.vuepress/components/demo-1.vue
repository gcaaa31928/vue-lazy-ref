<template>
	<div>
		<div v-if="show">
			<input ref="test" v-lazy-ref="'test'" >
		</div>
			<div>will display value when input element present: <span>{{ el }} </span></div>
		<button @click="show = !show">click to show input element</button>
	</div>
</template>
<script>
import vLazyRefPlugin from '../../../index.js';
import Vue from 'vue';
Vue.use(vLazyRefPlugin);
export default {
	data() {
		return {
			show: false,
			el: null
		};
	},
	async mounted() {
		this.el = await this.$getLazyRefs('test');
	},
	methods: {
	}
}
</script>
