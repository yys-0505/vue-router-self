export function createRoute(record, location) {
  let res = [];
  if (record) { // { path: xx, component:xx, parent: xx}
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
  }
  // { path: xxx, matched: []}
  return {
    ...location,
    matched: res
  }
}

export default class History {
  constructor(router) { // new VueRouter
    this.router = router;
    // 默认路由中应该保存一个当前路径 后续会更改这个路径
    //{ path: '/',  matched: [] }
    this.current = createRoute(null, {
      path: '/'
    })
    // {path: '/about/a', matched: [about, aboutA]} 两条记录
  }
  // 跳转的核心逻辑 location代表跳转的目的地 onComplete跳转成功的回调
  transitionTo(location, onComplete) {
    let route = this.router.match(location); // 根据路径 找到记录
    // route 就是当前路径 要匹配的那些路由
    // 如 /about/a => {path: /about/a, matched: [about, aboutA]}
    if (this.current.path === location && route.matched.length === this.current.matched.length) {
      return; // 相同路径 不跳转
    }
    this.updateRoute(route);
    onComplete && onComplete();
  }
  updateRoute(route) {
    this.current = route;
    this.cb && this.cb(route);
  }
  listen(cb) {
    this.cb = cb;
  }
}