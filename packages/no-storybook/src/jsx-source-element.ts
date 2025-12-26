import type { ComponentType, MemoExoticComponent, NamedExoticComponent, ReactElement, ReactNode } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

export interface JsxSourceInterface extends HTMLElement {
  jsx: ReactNode | null;
}

/**
 * Render a `Component` using React, with `args` and `defaultArgs` as properties.
 */
customElements.define(
  'jsx-source',
  class JsxSourceElement extends HTMLElement implements JsxSourceInterface {
    _jsx: ReactNode | null = null;

    set jsx(value: ReactNode) {
      this._jsx = value;
      this.render();
    }
    get jsx() {
      return this._jsx;
    }

    constructor() {
      super();
      this.render();
    }
    connectedCallback() {
      this.render();
    }

    render() {
      if (this._jsx) {
        const source = reactElementToJSXString(this._jsx, {
          displayName: (x) => {
            if (x && typeof x === 'object') {
              const namedExoticComponent = x as unknown as NamedExoticComponent;
              const reactElement = x as unknown as ReactElement;
              const memoExoticComponent = x as unknown as MemoExoticComponent<ComponentType<unknown>>;
              if (typeof namedExoticComponent.displayName === 'string') {
                return namedExoticComponent.displayName;
              } else if (memoExoticComponent.type.displayName) {
                return memoExoticComponent.type.displayName;
              } else if (memoExoticComponent.type.name) {
                return memoExoticComponent.type.name;
              } else if (typeof reactElement.type === 'string') {
                return reactElement.type;
              }
            }
            return 'Unknown';
          },
        });
        this.textContent = source;
      }
    }
  },
);
