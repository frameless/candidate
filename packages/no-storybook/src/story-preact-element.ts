import { render as renderPreact, createElement as createElementPreact } from 'preact';
import { ComponentType, ReactNode } from 'preact/compat';

customElements.define(
  'story-preact',
  class StoryPreactElement extends HTMLElement {
    Component: ComponentType<unknown> | null = null;
    defaultArgs = {};
    args = {};
    constructor() {
      super();
      this.render();
    }
    render() {
      // Remove current rendering
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }

      // try {
      this.renderPreact();
    }

    renderPreact() {
      const { Component, defaultArgs, args } = this;

      const createElement = createElementPreact;
      const render = renderPreact;

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
        console.log('componentRendering', componentRendering);
        return componentRendering;
      };

      // Render new version
      render(renderComponent(), this);
    }
  },
);
