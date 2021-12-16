export const getDocument = () => {
  if (typeof document !== 'undefined') {
    return document;
  }
  return null;
};

/**
 * 是否为类组件
 * @param {any} component 待检测的组件
 * @returns true | false
 */
export function isClassComponent(component: any) {
  return typeof component === 'function' && !!component.prototype.isReactComponent;
}
