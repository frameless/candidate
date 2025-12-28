import { createRoot, Root } from 'react-dom/client';
import { ArgTypes } from '@storybook/react-vite';
import type { InputType } from 'storybook/internal/csf';
import { createElement } from 'react';
import { StoryReactInterface } from './story-react-element';

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

      const isStoryReact = (el: HTMLElement | null): el is StoryReactInterface =>
        !!el && el.localName === 'story-react';
      const isTextbox = (el: EventTarget | HTMLElement | null): el is HTMLInputElement =>
        !!el && el instanceof HTMLInputElement && el.type === 'text';
      const isCheckbox = (el: EventTarget | HTMLElement | null): el is HTMLInputElement =>
        !!el && el instanceof HTMLInputElement && el.type === 'checkbox';
      const isSelect = (el: EventTarget | HTMLElement | null): el is HTMLInputElement =>
        !!el && el instanceof HTMLSelectElement;

      const ArgInput = ({ name }: { name: string }) => {
        return createElement('input', {
          defaultValue: this._values[name],
          onInput: (evt) => {
            const target = this.getAttribute('target');
            const targetEl = target ? document.getElementById(target) : null;
            if (isStoryReact(targetEl) && isTextbox(evt.target)) {
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
              if (isStoryReact(targetEl) && isCheckbox(evt.target)) {
                targetEl.args = {
                  ...targetEl.args,
                  [name]: evt.target.checked,
                };
              }
            },
          });
        } else if (
          argType.control === 'select' ||
          (!!argType.control && typeof argType.control === 'object' && argType.control?.type === 'select')
        ) {
          return createElement('select', {
            defaultValue: Object.hasOwn(this.values, name) ? this._values[name] : undefined,
            children: argType.options?.map((option, index) => {
              return createElement('option', { key: index }, String(option));
            }),
            onInput: (evt) => {
              const target = this.getAttribute('target');
              const targetEl = target ? document.getElementById(target) : null;
              if (isStoryReact(targetEl) && isSelect(evt.target)) {
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

      // Render new version
      this.renderRoot.render(
        createElement('dl', {
          children: [
            ...Object.entries(argTypes)
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
                      children: createElement('label', { children: argType.name || name || '' }),
                    }),
                    createElement('dd', {
                      children: ArgControl({ argType: argType as InputType, name }),
                    }),
                  ),
                ];
              }),
          ],
        }),
      );
    }
  },
);
