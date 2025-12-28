import { createRoot, Root } from 'react-dom/client';
import { ArgTypes } from '@storybook/react-vite';
import { createElement } from 'react';
import { InputType } from 'storybook/internal/csf';

customElements.define(
  'args-docs',
  class ArgsDocs<T = InputType> extends HTMLElement {
    _argTypes: Partial<ArgTypes<T>> = {};
    _values: { [index: string]: unknown } = {};
    renderRoot: Root;
    set argTypes(value: Partial<ArgTypes<T>>) {
      this._argTypes = value;
      this.render();
    }
    get argTypes() {
      return this._argTypes;
    }
    set values(value: { [index: string]: unknown }) {
      this._values = value;
      this.render();
    }
    get values() {
      return this._values;
    }

    constructor() {
      super();
      this.renderRoot = createRoot(this);
      this.render();
    }
    render() {
      const { argTypes } = this;

      // Render new version
      this.renderRoot.render(
        createElement('dl', {
          children: Object.entries(argTypes)
            .filter(([name]) => name !== 'default')
            .map(([name, value]) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const argType = value as unknown as any;
              return [
                createElement(
                  'div',
                  {
                    key: name,
                  },
                  createElement('dt', {
                    children: createElement('h3', {
                      children: argType.name || name || '',
                    }),
                  }),
                  argType.description
                    ? createElement('dt', {
                        children: createElement('markdown-html', {
                          value: argType.description,
                        }),
                      })
                    : null,
                ),
              ];
            }),
        }),
      );
    }
  },
);
