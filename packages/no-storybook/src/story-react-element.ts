import { createRoot, Root } from 'react-dom/client';
import { createElement, type ReactNode } from 'react';
import { ComponentType } from 'react';

export interface JsxChangeEvent {
  detail: {
    jsx: ReactNode;
  };
}

export interface StoryReactInterface extends HTMLElement {
  jsxChange: ((evt: Event) => void) | null;
  defaultArgs: object;
  args: object;
}

/**
 * Render a `Component` using React, with `args` and `defaultArgs` as properties.
 */
customElements.define(
  'story-react',
  class StoryReactElement extends HTMLElement implements StoryReactInterface {
    Component: ComponentType<unknown> | null = null;
    _args = {};
    _renderRoot: Root;
    jsxChange: ((evt: Event) => void) | null = null;
    _defaultArgs = {};

    set defaultArgs(value: object) {
      this._defaultArgs = value;
      this.render();
    }
    get defaultArgs() {
      return this._defaultArgs;
    }

    set args(value: object) {
      this._args = value;
      this.render();
    }
    get args() {
      return this._args;
    }

    constructor() {
      super();
      this._renderRoot = createRoot(this);
      this.render();
    }
    connectedCallback() {
      this.render();
    }

    render() {
      const { Component, _args: args, _defaultArgs: defaultArgs } = this;

      if (!Component) return;
      const renderComponent = () => {
        let componentRendering: ReactNode = 'No component configured';

        try {
          componentRendering = Component
            ? createElement(Component as never, {
                ...defaultArgs,
                ...args,
              })
            : null;
        } catch (e) {
          componentRendering = 'Error: could not render component';
          console.error(e);
        }

        return componentRendering;
      };

      // Render new version
      const result = renderComponent();

      const evt = new CustomEvent('change', {
        detail: {
          jsx: result,
        },
      } satisfies JsxChangeEvent);

      if (typeof this.jsxChange === 'function') {
        this.jsxChange(evt);
      }

      this.dispatchEvent(evt);

      this._renderRoot.render(result);
    }
  },
);
