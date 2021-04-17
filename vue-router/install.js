import RouterView from './components/view.js';
// import RouterLink from './components/link.js';

export let _Vue;

export default function install (Vue){
  _Vue = Vue;
  Vue.mixin({
    // 在所有组件上都加了_routerRoot属性
    beforeCreate() { // 混入组件 [beforeCreate, beforeCreate]
      if (this.$options.router) { // 根实例
        this._routerRoot = this; // 根实例放到_routerRoot上
        this._router = this.$options.router;
        this._router.init(this);

        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else { // 子组件
        // 子组件_routerRoot找到根实例。这样所有组件都能拿到根实例  
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$route', { // current
    get() {
      return this._routerRoot._route;
    }
  })
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router; // router实例
    }
  })
  Vue.component('RouterView', RouterView)
  // Vue.component('RouterLink', RouterLink)
}