const style = (element: HTMLElement, prop: any) =>
  typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(element, null).getPropertyValue(prop)
    : element.style[prop];

const overflow = (element: HTMLElement) =>
  style(element, 'overflow') + style(element, 'overflow-y') + style(element, 'overflow-x');

const getScrollParent = (element: HTMLElement | undefined) => {
  if (!(element instanceof HTMLElement)) {
    return window;
  }

  let parent = element;

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }

    if (!parent.parentNode) {
      break;
    }

    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent;
    }

    parent = parent.parentNode as HTMLElement;
  }

  return window;
};

export default getScrollParent;
