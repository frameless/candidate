import { createRoot, Root } from 'react-dom/client';
import { createElement, type ReactNode } from 'react';
import { ComponentType } from 'react';

customElements.define(
  'story-react',
  class StoryReactElement extends HTMLElement {
    Component: ComponentType<unknown> | null = null;
    defaultArgs = {};
    args = {};
    renderRoot: Root;
    constructor() {
      super();
      this.renderRoot = createRoot(this);
      this.render();
    }
    render() {
      // Remove current rendering
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }
      this.renderPreact();
    }
    connectedCallback() {
      this.render();
    }

    renderPreact() {
      const { Component, defaultArgs, args } = this;

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
        console.log('componentRendering', Component, this.args, this.defaultArgs, componentRendering, this);
        return componentRendering;
      };

      // Render new version
      this.renderRoot.render(renderComponent());
    }
  },
);
