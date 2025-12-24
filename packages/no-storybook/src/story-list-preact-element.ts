import { createRoot } from 'react-dom/client';
import { createElement as createElementReact, type ReactNode } from 'react';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import { ComponentType } from 'react';
import { create } from 'domain';

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
    argTypes: Partial<ArgTypes<T>> = {};

    constructor() {
      super();
      const src = this.getAttribute('src');
      if (typeof src === 'string') {
        import(src).then((stories: StoriesFile) => {
          const Component = stories.default.component;
          const defaultArgs = stories.default.args;
          this.argTypes = stories.default.argTypes;
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
      console.log('💩', Component, Component ? Component.displayName : '');
      // Render new version
      render(
        createElement('div', {
          children: [
            createElement('h1', { children: this.storyTitle }),
            ...Object.entries(stories)
              .filter(([name]) => name !== 'default')
              .map(([name, storyObj], index) => {
                const canvasId = `story-${storyId}-${index}`;
                const jsxId = `story-jsx-${storyId}-${index}`;
                const htmlId = `story-html-${storyId}-${index}`;
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
                      jsxChange: (evt) => {
                        document.getElementById(jsxId).jsx = evt.detail.jsx;
                      },
                    }),
                  }),
                  createElement('details', {
                    open: true,
                    children: [
                      createElement('summary', { children: 'Show HTML' }),
                      createElement('pre', {
                        id: htmlId,
                        children: createElement('code', {
                          children: createElement('code-block', {
                            language: 'html',
                            children: createElement('inner-html', {
                              query: `#${canvasId}`,
                            }),
                          }),
                        }),
                      }),
                      createElement('button', {
                        children: 'Copy HTML',
                        onClick: () => {
                          const code = document.getElementById(htmlId)?.textContent || '';
                          console.log('Copy', htmlId, code);
                          navigator.clipboard.writeText(code);
                        },
                      }),
                    ],
                  }),
                  createElement('details', {
                    open: true,
                    children: [
                      createElement('summary', { children: 'Show JSX' }),
                      createElement('pre', {
                        children: createElement('code', {
                          children: createElement('code-block', {
                            language: 'jsx',
                            children: createElement('jsx-source', {
                              id: jsxId,
                              children: null,
                              jsx: Component
                                ? createElement(Component, {
                                    ...storyObj.args,
                                    ...defaultArgs,
                                  })
                                : null,
                            }),
                          }),
                        }),
                      }),
                      createElement('button', {
                        children: 'Copy JSX',
                        onClick: () => {
                          const code = document.getElementById(jsxId)?.textContent || '';
                          console.log('Copy', jsxId, code);
                          navigator.clipboard.writeText(code);
                        },
                      }),
                    ],
                  }),
                  createElement('details', {
                    open: false,
                    children: [
                      createElement('summary', { children: 'Properties' }),
                      createElement('args-table', {
                        target: canvasId,
                        argTypes: this.argTypes,
                        values: {
                          ...storyObj.args,
                          ...defaultArgs,
                        },
                      }),
                    ],
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
