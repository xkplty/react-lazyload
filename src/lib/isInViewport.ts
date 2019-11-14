import getElementPosition from './getElementPosition';

type CustomOffset = {
  top: number
  right: number
  bottom: number
  left: number
}

const isHidden = (element: HTMLElement) => element.offsetParent === null;

export default function isInViewport(element: HTMLElement,
  container: HTMLElement | undefined, customOffset: CustomOffset): boolean {
  if (isHidden(element)) {
    return false;
  }

  let top;
  let bottom;
  let left;
  let right;

  if (typeof container === 'undefined') {
    top = window.pageYOffset;
    left = window.pageXOffset;
    bottom = top + window.innerHeight;
    right = left + window.innerWidth;
  } else {
    const containerPosition = getElementPosition(container);

    top = containerPosition.top;
    left = containerPosition.left;
    bottom = top + container.offsetHeight;
    right = left + container.offsetWidth;
  }

  const elementPosition = getElementPosition(element);

  return (
    top <= elementPosition.top + element.offsetHeight + customOffset.top &&
    bottom >= elementPosition.top - customOffset.bottom &&
    left <= elementPosition.left + element.offsetWidth + customOffset.left &&
    right >= elementPosition.left - customOffset.right
  );
}
