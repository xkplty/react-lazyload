const wrap = (standard: string, fallback: string) => {
  return function (el: any, evtName: string, listener: Function, useCapture?: boolean) {
    if (el[standard]) {
      el[standard](evtName, listener, useCapture);
    } else if (el[fallback]) {
      el[fallback]('on' + evtName, listener);
    }
  }
}

export const add = wrap('addEventListener', 'attachEvent')
export const remove = wrap('removeEventListener', 'detachEvent')
