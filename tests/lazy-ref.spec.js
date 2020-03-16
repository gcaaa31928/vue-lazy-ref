import { mount, createLocalVue } from '@vue/test-utils';
import vLazyRefPlugin from '@/index.js';
import Vue from 'vue';
import flushPromise from 'flush-promises';

Vue.use(vLazyRefPlugin);

const CustomComp = {
	template: '<div><slot v-if="showSlot" /></div>',
	props: {
		showSlot: false
	}
};

describe('lazy ref', () => {
	describe('html element', () => {
		it ('get instantly', async done => {
			const wrapper = mount({
				template: `<div ref="test" v-lazy-ref="'test'" />`,
			});
			expect(await wrapper.vm.$getLazyRefs('test')).toBe(wrapper.vm.$refs['test']);
			done();
		});
		it ('lazy get', async done => {
			const wrapper = mount({
				template: `<div ref="test" v-if="show" v-lazy-ref="'test'" />`,
				data: () => ({
					show: false
				})
			});
			wrapper.vm.$getLazyRefs('test').then((el) => {
				expect(el).toBe(wrapper.vm.$refs['test']);
				done();
			});
			wrapper.vm.show = true;
		});
		it ('lazy get when inside a hidden parent', async done => {
			const wrapper = mount({
				template: `
					<div v-if="show">
						<div ref="test" v-lazy-ref="'test'" />
					</div>
				`,
				data: () => ({
					show: false
				})
			});
			wrapper.vm.$getLazyRefs('test').then((el) => {
				expect(el).toBe(wrapper.vm.$refs['test']);
				done();
			});
			wrapper.vm.show = true;
		});
		it ('lazy get when replace by key', async done => {
			const wrapper = mount({
				template: `
					<div>
						<div ref="test" v-if="hide" />
						<div ref="test" v-else v-lazy-ref="'test'" />
					</div>
				`,
				data: () => ({
					hide: true
				})
			});
			wrapper.vm.$getLazyRefs('test').then((el) => {
				expect(el).toBe(wrapper.vm.$refs['test']);
				done();
			});
			wrapper.vm.hide = false;
		});
		it ('lazy get inside a hidden slot', async done => {
			const wrapper = mount({
				template: `
					<custom-comp :show-slot="show">
						<div ref="test" v-lazy-ref="'test'" />
					</custom-comp>
				`,
				components: {
					CustomComp
				},
				data: () => ({
					show: false
				})
			});
			wrapper.vm.$getLazyRefs('test').then((el) => {
				expect(el).toBe(wrapper.vm.$refs['test']);
				done();
			});
			wrapper.vm.show = true;
		});
		it ('cannot get ref if not exists ', async done => {
			const wrapper = mount({
				template: `<div v-if="show" ref="test" v-lazy-ref="'test'" />`,
				data: () => ({
					show: true
				})
			});
			await wrapper.vm.$getLazyRefs('test');
			wrapper.vm.show = false;
			await flushPromise();
			const spy = jest.fn();
			wrapper.vm.$getLazyRefs('test').then(spy);
			setTimeout(() => {
				expect(spy).not.toHaveBeenCalled()
				done();
			}, 1000);
		});
	});
	describe('component', () => {
		it ('get instantly', async done => {
			const wrapper = mount({
				template: `
					<div>
						<custom-comp v-lazy-ref="'test'" ref="test" />
					</div>
				`,
				components: {
					CustomComp
				}
			});
			expect(await wrapper.vm.$getLazyRefs('test')).toBe(wrapper.vm.$refs['test']);
			done();
		});
		it ('lazy get', async done => {
			const wrapper = mount({
				template: `
					<custom-comp v-if="show" v-lazy-ref="'test'" ref="test" />
				`,
				components: {
					CustomComp
				},
				data: () => ({
					show: false
				})
			});
			wrapper.vm.$getLazyRefs('test').then((el) => {
				expect(el).toBe(wrapper.vm.$refs['test']);
				done();
			});
			wrapper.vm.show = true;
		});
		it ('lazy get when inside a hidden element', async done => {
			const wrapper = mount({
				template: `
					<div v-if="show">
						<custom-comp v-lazy-ref="'test'" ref="test" />
					</div>
				`,
				components: {
					CustomComp
				},
				data: () => ({
					show: false
				})
			});
			wrapper.vm.$getLazyRefs('test').then((el) => {
				expect(el).toBe(wrapper.vm.$refs['test']);
				done();
			});
			wrapper.vm.show = true;
		});
		it ('lazy get when changed key', async done => {
			const wrapper = mount({
				template: `
					<div v-if="show">
						<custom-comp v-if="show" v-lazy-ref="'test'" ref="test" />
						<custom-comp />
					</div>
				`,
				components: {
					CustomComp
				},
				data: () => ({
					show: false
				})
			});
			wrapper.vm.$getLazyRefs('test').then((el) => {
				expect(el).toBe(wrapper.vm.$refs['test']);
				done();
			});
			wrapper.vm.show = true;
		});
		it ('cannot get ref if not exists ', async done => {
			const wrapper = mount({
				template: `<custom-comp v-if="show" ref="test" v-lazy-ref="'test'" />`,
				components: {
					CustomComp
				},
				data: () => ({
					show: true
				})
			});
			await wrapper.vm.$getLazyRefs('test');
			wrapper.vm.show = false;
			await flushPromise();
			const spy = jest.fn();
			wrapper.vm.$getLazyRefs('test').then(spy);
			setTimeout(() => {
				expect(spy).not.toHaveBeenCalled()
				done();
			}, 1000);
		});
	});
});
