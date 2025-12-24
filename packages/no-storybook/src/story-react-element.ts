import { createRoot, Root } from 'react-dom/client';
import { createElement, type ReactNode } from 'react';
import { ComponentType } from 'react';

/**
 * Render a `Component` using React, with `args` and `defaultArgs` as properties.
 */
customElements.define(
  'story-react',
  class StoryReactElement extends HTMLElement {
    Component: ComponentType<unknown> | null = null;
    _args = {};
    renderRoot: Root;
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
      this.renderRoot = createRoot(this);
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
      this.renderRoot.render(result);
    }
  },
);
