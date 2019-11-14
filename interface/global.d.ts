
declare module "eventlistener" {

  export function add(element: HTMLElement | Window, eventType: string, handler: Function): void;

  export function remove(element: HTMLElement | Window, eventType: string, handler: Function): void;
}