import type { ReactNode } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

/**
 * Render a `Component` using React, with `args` and `defaultArgs` as properties.
 */
customElements.define(
  'jsx-source',
  class JsxSourceElement extends HTMLElement {
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
            if (x.displayName) {
              return x.displayName;
            } else if (x.type.displayName) {
              return x.type.displayName;
            } else if (x.type.name) {
              return x.type.name;
            } else if (typeof x.type === 'string') {
              return x.type;
            } else {
              return 'Unknown';
            }
          },
        });
        this.textContent = source;
      }
    }
  },
);
