import { ArgTypes } from '@storybook/react-vite';
import type { InputType } from 'storybook/internal/csf';
import { render, createElement } from 'preact';

customElements.define(
  'args-table-preact',
  class StoryReact<T = InputType> extends HTMLElement {
    argTypes: Partial<ArgTypes<T>> = {};
    constructor() {
      super();
      const src = this.getAttribute('src');
      if (typeof src === 'string') {
        import(src).then((stories) => {
          this.argTypes = stories.default.argTypes;
          this.render();
        });
      }
    }
    render() {
      const { argTypes } = this;
      // Remove current rendering
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }

      // Render new version
      render(
        createElement('div', {
          children: [
            ...Object.entries(argTypes)
              .filter(([name]) => name !== 'default')
              .map(([name, argType]) => [
                createElement('div', {
                  children: [
                    createElement('h2', { children: createElement('code', { children: name }) }),
                    createElement('p', {
                      children: (argType as InputType)?.description,
                    }),
                  ],
                }),
              ]),
          ],
        }),
        this,
      );
    }
  },
);
