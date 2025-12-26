import { createRoot } from 'react-dom/client';
import { createElement as createElementReact, type ReactNode } from 'react';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import { ComponentType } from 'react';
import themeJSON from '@nl-design-system-unstable/voorbeeld-design-tokens/dist/tokens.json';

const fromFigmaTokens = (arg: any) => {
  return themeJSON;
};
type StoriesFile = {
  default: Meta;
  [index: string]: StoryObj;
};

customElements.define(
  'story-list',
  class StoryList extends HTMLElement {
    Component: ComponentType<unknown> | null = null;
    stories: { [index: string]: StoryObj } = {};
    defaultArgs = {};
    storyTitle = '';
    argTypes: Partial<ArgTypes<T>> = {};
    tokens: object | undefined;
    defaultTheme = fromFigmaTokens(themeJSON);

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
          this.tokens =
            stories.default.parameters && stories.default.parameters['tokens']
              ? (stories.default.parameters['tokens'] as object)
              : undefined;
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

      const storyId = this.storyTitle.replace(/[^\w+]/g, '');
      const cssId = `css-${storyId}`;

      // Render new version
      render(
        createElement('div', {
          children: [
            createElement('h1', { children: this.storyTitle }),

            createElement('details', {
              open: false,
              children: [
                createElement('summary', { children: 'Documentation' }),
                createElement('args-docs', {
                  argTypes: this.argTypes,
                }),
              ],
            }),
            this.tokens
              ? createElement('details', {
                  open: true,
                  children: [
                    createElement('summary', { children: 'Show Design Tokens' }),
                    createElement('pre', {
                      children: createElement('code', {
                        children: createElement('code-block', {
                          id: cssId,
                          language: 'css',
                          children: `.example-theme{}`,
                        }),
                      }),
                    }),
                    createElement('copy-action', {
                      query: `#${cssId}`,
                      children: createElement('button', {
                        className: 'nl-button nl-button--secondary',
                        children: 'Copy CSS',
                      }),
                    }),
                    createElement('design-tokens-table', {
                      tokens: this.tokens,
                      defaultTokens: this.defaultTheme,
                      themeChange: (el: Element) => {
                        const cssCodeBlock = document.getElementById(cssId);
                        if (cssCodeBlock) {
                          cssCodeBlock.textContent = el.css;
                        }
                      },
                    }),
                  ],
                })
              : null,
            ...Object.entries(stories)
              .filter(([name]) => name !== 'default')
              .map(([name, storyObj], index) => {
                const headingId = `heading-${storyId}-${index}`;
                const canvasId = `story-${storyId}-${index}`;
                const jsxId = `story-jsx-${storyId}-${index}`;
                const htmlId = `story-html-${storyId}-${index}`;

                return createElement('div', {
                  key: headingId,
                  children: [
                    createElement('h2', {
                      id: headingId,
                      children: storyObj.name || name,
                    }),
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
                        createElement('copy-action', {
                          query: `#${htmlId}`,
                          children: createElement('button', {
                            className: 'nl-button nl-button--secondary',
                            children: 'Copy HTML',
                          }),
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
                        createElement('copy-action', {
                          query: `#${jsxId}`,
                          children: createElement('button', {
                            className: 'nl-button nl-button--secondary',
                            children: 'Copy JSX',
                          }),
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
                  ],
                });
              }),
          ],
        }),
        this,
      );
    }
  },
);
