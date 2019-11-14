import React, { Children, Component, ReactNode } from 'react';
import { findDOMNode } from 'react-dom';
import { add, remove } from 'eventlistener';
import { debounce, throttle } from 'lodash';
import getScrollParent from './lib/getScrollParent';
import isInViewport from './lib/isInViewport';

type LazyLoadProps = {
  children: ReactNode
  fallbackUI: ReactNode
  scrollContainer: string
  className: string
  debounce: boolean
  elementType: string
  offset: number
  offsetBottom: number
  offsetHorizontal: number
  offsetLeft: number
  offsetRight: number
  offsetTop: number
  offsetVertical: number
  threshold: number
  throttle: number
  width: string | number
  height: string | number
  onContentVisible: Function
}

type LazyLoadState = {
  visible: boolean
}

export default class LazyLoad extends Component<LazyLoadProps, LazyLoadState> {
  static defaultProps = {
    elementType: 'div',
    debounce: true,
    offset: 0,
    offsetBottom: 0,
    offsetHorizontal: 0,
    offsetLeft: 0,
    offsetRight: 0,
    offsetTop: 0,
    offsetVertical: 0,
    throttle: 250,
    scrollContainer: '',
    fallbackUI: null,
  }

  _mounted = false;

  constructor(props: LazyLoadProps) {
    super(props);
    this.state = { visible: false };

    if (props.throttle > 0) {
      if (props.debounce) {
        this.lazyLoadHandler = debounce(this.lazyLoadHandler, props.throttle);
      } else {
        this.lazyLoadHandler = throttle(this.lazyLoadHandler, props.throttle);
      }
    }
  }

  componentDidMount() {
    this._mounted = true;
    const eventNode = this.getEventNode();

    window.requestAnimationFrame(this.lazyLoadHandler);
    add(window, 'resize', this.lazyLoadHandler);
    add(eventNode as HTMLElement, 'scroll', this.lazyLoadHandler);
  }

  componentWillReceiveProps() {
    if (!this.state.visible) {
      this.lazyLoadHandler();
    }
  }

  shouldComponentUpdate(nextProps: LazyLoadProps, nextState: LazyLoadState) {
    return nextState.visible;
  }

  componentWillUnmount() {
    this._mounted = false;
    this.detachListeners();
  }

  getEventNode = () => {
    if (this.props.scrollContainer) {
        const allScrollDom = document.querySelectorAll(this.props.scrollContainer);
        const scrollDom = allScrollDom.length > 0 && allScrollDom[allScrollDom.length - 1];
        return scrollDom || getScrollParent(findDOMNode(this));
    }
    return getScrollParent(findDOMNode(this));
  }

  getOffset = () => {
    const {
      offset, offsetVertical, offsetHorizontal,
      offsetTop, offsetBottom, offsetLeft, offsetRight, threshold,
    } = this.props;

    const _offsetAll = threshold || offset;
    const _offsetVertical = offsetVertical || _offsetAll;
    const _offsetHorizontal = offsetHorizontal || _offsetAll;

    return {
      top: offsetTop || _offsetVertical,
      bottom: offsetBottom || _offsetVertical,
      left: offsetLeft || _offsetHorizontal,
      right: offsetRight || _offsetHorizontal,
    };
  }

  lazyLoadHandler = () => {
    if (!this._mounted) {
      return;
    }
    const offset = this.getOffset();
    const node = findDOMNode(this);
    const eventNode = this.getEventNode();

    if (isInViewport(node as HTMLElement, eventNode as HTMLElement, offset)) {
      const { onContentVisible } = this.props;

      this.setState({ visible: true }, () => {
        if (onContentVisible) {
          onContentVisible();
        }
      });
      this.detachListeners();
    }
  }

  detachListeners = () => {
    const eventNode = this.getEventNode();
    remove(window, 'resize', this.lazyLoadHandler);
    remove(eventNode as HTMLElement, 'scroll', this.lazyLoadHandler);
  }

  render() {
    const { children, className, height, width, fallbackUI } = this.props;
    const { visible } = this.state;

    const elStyles = { height, width };
    const elClasses = (
      'LazyLoad' +
      (visible ? ' is-visible' : '') +
      (className ? ` ${className}` : '')
    );

    return React.createElement(this.props.elementType, {
      className: elClasses,
      style: elStyles,
    }, visible ? Children.only(children) : fallbackUI);
  }
}
