export default {
  functional: true,
  render(h, { parent, data }){
    // /about/a matched=[about, aboutA]
    let route = parent.$route; // current
    let matched = route.matched;
    data.routerView = true; // 当前组件是一个routerView

    let depth = 0;

    while(parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth ++;
      }
      parent = parent.$parent;
    }
    let record = matched[depth];
    if (!record) {
      return h();
    }
    let component = record.component;
    return h(component, data);
  }
}