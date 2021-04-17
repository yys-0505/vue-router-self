import install from './install.js';
import createMatcher from './create-matcher.js';
import HashHistory from './history/hash.js';

export default class VueRouter {
  constructor(options) {
    // 将routes转化为好维护的结构
    // match 匹配路径 {'/': '记录', 'about':'记录'}
    // addRoutes 动态添加路由配置
    this.matcher = createMatcher(options.routes || []);

    // 根据模式创建不同路由对象
    this.mode = options.mode || 'hash';
    this.history = new HashHistory(this);
  }
  init(app) { // app是根实例
    // 先根据当前路径 显示指定组件
    const history = this.history;

    const setupHashListener = () => {
      history.setupListener();
    }
    history.transitionTo(
      history.getCurrentLocation(), // 后续要监听路由变化
      setupHashListener
    );
    history.listen((route) => {
      app._route = route; // 视图就可以刷新
    });
  }
  // 用来匹配路径
  match(location) {
    return this.matcher.match(location);
  }
}
VueRouter.install = install;