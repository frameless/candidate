import { createRoot, Root } from 'react-dom/client';
import { ArgTypes } from '@storybook/react-vite';
import type { InputType } from 'storybook/internal/csf';
import { createElement } from 'react';

customElements.define(
  'args-table',
  class StoryReact<T = InputType> extends HTMLElement {
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

      const ArgInput = ({ name }: { name: string }) => {
        return createElement('input', {
          defaultValue: this._values[name],
          onInput: (evt) => {
            const target = this.getAttribute('target');
            const targetEl = target ? document.getElementById(target) : null;
            if (targetEl) {
              targetEl.args = {
                ...targetEl.args,
                [name]: evt.target.value,
              };
            }
          },
        });
      };

      const ArgControl = ({ name, argType }: { name: string; argType: InputType }) => {
        if (argType.control === 'boolean') {
          return createElement('input', {
            type: 'checkbox',
            defaultChecked: Object.hasOwn(this.values, name) && this._values[name] === true,
            onInput: (evt) => {
              const target = this.getAttribute('target');
              const targetEl = target ? document.getElementById(target) : null;
              if (targetEl) {
                targetEl.args = {
                  ...targetEl.args,
                  [name]: evt.target.checked,
                };
              }
            },
          });
        } else if (argType.control === 'select' || argType.control?.type === 'select') {
          return createElement('select', {
            defaultValue: Object.hasOwn(this.values, name) ? this._values[name] : undefined,
            children: argType.options?.map((option) => {
              return createElement('option', { children: String(option) });
            }),
            onInput: (evt) => {
              const target = this.getAttribute('target');
              const targetEl = target ? document.getElementById(target) : null;
              if (targetEl) {
                targetEl.args = {
                  ...targetEl.args,
                  [name]: evt.target.value,
                };
              }
            },
          });
        } else {
          return ArgInput({ name });
        }
      };

      /*
          iconOnly: {
      control: 'boolean',
      description: 'Laat alleen icons zien, verberg de tekst.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    iconStart: {
      control: false,
      description: 'Een icon voor de content van de button',
      table: { category: 'Props', type: { summary: 'ReactNode' } },
    },
    */
      // Render new version
      this.renderRoot.render(
        createElement('dl', {
          children: [
            ...Object.entries(argTypes)
              .filter(([name]) => name !== 'default')
              .map(([name, argType]) => [
                createElement('div', {
                  children: [
                    createElement('dt', {
                      children: createElement('label', { children: argType.name || name || '' }),
                    }),
                    // argType.description
                    //   ? createElement('dt', {
                    //       children: argType.description,
                    //     })
                    //   : null,
                    createElement('dd', {
                      children: ArgControl({ argType: argType as InputType, name }),
                    }),
                  ],
                }),
              ]),
          ],
        }),
      );
    }
  },
);
