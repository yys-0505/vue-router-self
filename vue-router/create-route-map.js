// 将用户传入的数据进行格式化
export default function createRouteMap(routes, oldPathList, oldPathMap) {
  let pathList = oldPathList || [];
  let pathMap = oldPathMap || Object.create(null); // 没有原型链
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap);
  });
  return {
    pathList,
    pathMap
  }
}

function addRouteRecord(route, pathList, pathMap, parent) {
  let path = parent ? `${parent.path}/${route.path}` : route.path;
  let record = { // 记录
    path,
    component: route.component,
    parent
  }
  if (!pathMap[path]) {
    pathList.push(path);
    pathMap[path] = record;
  }
  if (route.children) {
    route.children.forEach(child => {
      // 每次循环儿子时都将父路径传入
      addRouteRecord(child, pathList, pathMap, record);
    })
  }
}