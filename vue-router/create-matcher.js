
import createRouteMap from './create-route-map.js';
import { createRoute } from './history/base.js'

export default function createMatcher(routes) {
  // 扁平化用户传入的数据，创建路由映射表
  // [/, /about, /about/a, /about/b]
  // {/: 记录, /about:记录, /about/a: 记录}
  let { pathList, pathMap } = createRouteMap(routes); // 初始化配置

  // 动态添加的方法
  function addRoutes(routes) { // 添加新的配置
    createRouteMap(routes, pathList, pathMap);
  }
  // 用来匹配的方法
  function match(location) { // 找到当前记录
    // {path: '/about/a', component:xxx} 先渲染about组件，再渲染a组件
    // 1，需要找到对应的记录 并且要根据记录产生一个匹配数组
    let record = pathMap[location];
    const local = {
      path: location
    };
    if (record) {
      return createRoute(record, local);
    }
    return createRoute(null, local)
  }
  return {
    match,
    addRoutes
  }
}