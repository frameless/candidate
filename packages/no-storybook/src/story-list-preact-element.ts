import { createRoot } from 'react-dom/client';
import { createElement as createElementReact, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentType } from 'react';

type StoriesFile = {
  default: Meta;
  [index: string]: StoryObj;
};

customElements.define(
  'story-list-preact',
  class StoryReact extends HTMLElement {
    Component: ComponentType<unknown> | null = null;
    stories: { [index: string]: StoryObj } = {};
    defaultArgs = {};
    storyTitle = '';
    constructor() {
      super();
      const src = this.getAttribute('src');
      if (typeof src === 'string') {
        import(src).then((stories: StoriesFile) => {
          const Component = stories.default.component;
          const defaultArgs = stories.default.args;
          this.storyTitle = stories.default.title || '';
          this.stories = stories;
          this.Component = Component || null;
          this.defaultArgs = defaultArgs ?? {};
          this.render();
        });
      }
    }
    render() {
      // Remove current rendering
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }

      const { Component, stories, defaultArgs } = this;

      const createElement = createElementReact;
      const render = (jsx: ReactNode, rootNode: Element | DocumentFragment | Document) => {
        const root = createRoot(rootNode);
        root.render(jsx);
      };

      // const renderComponent = (storyObj: StoryObj) => {
      //   let componentRendering: unknown = 'No component configured';

      //   try {
      //     componentRendering = Component
      //       ? createElement(Component as never, {
      //           ...defaultArgs,
      //           ...storyObj.args,
      //         })
      //       : null;
      //   } catch (e) {
      //     componentRendering = 'Error: could not render component';
      //     console.error(e);
      //   }
      //   console.log('componentRendering', componentRendering);
      //   return componentRendering;
      // };

      const storyId = this.storyTitle.replace(/[^\w+]/g, '');
      console.log('💩', Component);
      // Render new version
      render(
        createElement('div', {
          children: [
            createElement('h1', { children: this.storyTitle }),
            ...Object.entries(stories)
              .filter(([name]) => name !== 'default')
              .map(([name, storyObj], index) => {
                const canvasId = `story-${storyId}-${index}`;
                console.log(canvasId);
                return [
                  createElement('h2', { children: storyObj.name || name }),
                  // createElement('story-canvas', {
                  //   id: canvasId,
                  //   children: renderComponent(storyObj),
                  // }),
                  createElement('story-canvas', {
                    children: createElement('story-react', {
                      id: canvasId,
                      args: storyObj.args,
                      defaultArgs,
                      Component,
                    }),
                  }),
                  createElement('pre', {
                    children: createElement('code', {
                      children: createElement('code-block', {
                        language: 'html',
                        children: createElement('inner-html', {
                          query: `#${canvasId}`,
                        }),
                      }),
                    }),
                  }),
                ];
              }),
          ],
        }),
        this,
      );
    }
  },
);
