import { createRoot } from 'react-dom/client';
import { createElement as createElementReact, Fragment, FunctionComponent, type ReactNode } from 'react';
import type { ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/react-vite';
import { ComponentType } from 'react';
import themeJSON from '@nl-design-system-unstable/voorbeeld-design-tokens/dist/tokens.json';
import { JsxSourceInterface } from './jsx-source-element';
import { DesignTokensTableInterface, excludeTokens, getTokenPaths, TokenNode } from './design-tokens-table-element';
import merge from 'lodash-es/merge';
import { ArgsStoryFn } from 'storybook/internal/csf';

// Remove the hierarchy from the title
const normalizeStoryTitle = (title: string): string => title.replace(/^(.*\/)/, '');

type StoriesFile = {
  default: Meta;
  [index: string]: StoryObj;
};

export class StoryList extends HTMLElement {
  Component: ComponentType<unknown> | null = null;
  stories: { [index: string]: StoryObj } = {};
  defaultArgs = {};
  storyTitle = '';
  argTypes: Partial<ArgTypes> = {};
  tokens: TokenNode = {};
  defaultTheme = themeJSON;

  constructor() {
    super();
    const src = this.getAttribute('src');
    if (typeof src === 'string') {
      import(src).then((stories: StoriesFile) => {
        this.module = stories;
      });
    }
  }

  set module(stories: StoriesFile) {
    const Component = stories.default.component;
    const defaultArgs = stories.default.args;
    this.argTypes = stories.default.argTypes || {};
    this.storyTitle = typeof stories.default.title === 'string' ? normalizeStoryTitle(stories.default.title) : '';
    this.stories = stories;
    this.Component = Component || null;
    this.tokens =
      stories.default.parameters && stories.default.parameters['tokens']
        ? (stories.default.parameters['tokens'] as TokenNode)
        : {};
    this.defaultArgs = defaultArgs ?? {};
    this.render();
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

    const isJsxSource = (arg: EventTarget | HTMLElement | null): arg is JsxSourceInterface =>
      !!arg && arg instanceof HTMLElement && arg.localName === 'jsx-source';
    const isDesignTokensTable = (arg: EventTarget | HTMLElement | null): arg is DesignTokensTableInterface =>
      !!arg && arg instanceof HTMLElement && arg.localName === 'design-tokens-table';

    // These are the tokens that are used in a (non-default) Story.
    // The tokens that are not in this selection must be show for the default story.
    const storyTokens = Object.entries(this.stories)
      .filter(([name]) => name !== 'default')
      .map(([_, storyObj]) => (storyObj.parameters ? storyObj.parameters['tokens'] : undefined))
      .filter((x) => !!x)
      .reduce(merge, []);

    // TODO: Make a toggle UI for `showAllTokens`
    const showAllTokens = false;
    const otherTokens = excludeTokens(this.tokens, storyTokens);

    // TODO: There must be a faster way than this!
    const isEmptyTokenTree = (tokens: TokenNode) => getTokenPaths(tokens).length === 0;

    const showTokens = !showAllTokens && isEmptyTokenTree(otherTokens) ? false : !!this.tokens;
    // Render new version
    render(
      createElement(
        'section',
        {
          className: 'docs-story-file',
        },
        createElement('h1', { children: this.storyTitle }),

        createElement(
          'details',
          {
            open: false,
          },
          createElement('summary', { children: 'Documentation' }),
          createElement('args-docs', {
            argTypes: this.argTypes,
          }),
        ),
        showTokens
          ? createElement('details', {
              open: true,
              title: 'Design Tokens that do not have design stories',
              style: {
                backgroundColor: 'var(--basis-color-negative-bg-default)',
                borderColor: 'var(--basis-color-negative-border-default)',
                borderWidth: '2px',
                borderStyle: 'solid',
              },
              children: [
                createElement('summary', { children: 'Bekijk Design Tokens' }),
                createElement('pre', {
                  children: createElement(
                    'code',
                    createElement('copy-action', {
                      query: `#${cssId}`,
                      children: createElement('button', {
                        style: {
                          float: 'inline-end',
                        },
                        className: 'nl-button nl-button--secondary',
                        children: 'Kopieer CSS',
                      }),
                    }),
                    createElement('code-block', {
                      id: cssId,
                      language: 'css',
                      children: `.example-theme{}`,
                    }),
                  ),
                }),
                createElement('design-tokens-table', {
                  tokens: showAllTokens ? this.tokens : otherTokens,
                  defaultTokens: this.defaultTheme,
                  themeChange: (el: Element) => {
                    const cssCodeBlock = document.getElementById(cssId);
                    if (cssCodeBlock && isDesignTokensTable(el)) {
                      cssCodeBlock.textContent = el.css || '';
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
            const designStory = storyObj.parameters && storyObj.parameters['designStory'] === true;
            const showHtml = !designStory;
            const showJsx = !designStory;
            const showProperties = !designStory;

            const designTokensEditor = createElement(
              Fragment,
              {},
              createElement('design-tokens-table', {
                tokens: (storyObj.parameters && storyObj.parameters['tokens']) || {},
                defaultTokens: this.defaultTheme,
                themeChange: (el: Element) => {
                  const cssCodeBlock = document.getElementById(cssId);
                  if (cssCodeBlock && isDesignTokensTable(el)) {
                    cssCodeBlock.textContent = el.css || '';
                  }
                },
              }),
              // TODO: Only show code snippet when `desing-tokens-table` has some
              // modified tokens.
              createElement('pre', {
                children: createElement(
                  'code',
                  {},
                  createElement('copy-action', {
                    query: `#${cssId}`,
                    children: createElement('button', {
                      style: {
                        float: 'inline-end',
                      },
                      className: 'nl-button nl-button--secondary',
                      children: 'Kopieer CSS',
                    }),
                  }),
                  createElement('code-block', {
                    id: cssId,
                    language: 'css',
                    children: `.example-theme{}`,
                  }),
                ),
              }),
            );

            // A bit of a hack since we only provide `component` and not the other `StoryContext` properties
            const renderStoryFn =
              (renderFn: ArgsStoryFn, component: FunctionComponent): ArgsStoryFn =>
              (props) =>
                renderFn(props, { component } as unknown as StoryContext);

            const renderer: ArgsStoryFn | null =
              storyObj.render && !!Component
                ? renderStoryFn(storyObj.render, Component as unknown as FunctionComponent)
                : null;

            return createElement(
              'section',
              {
                key: headingId,
                className: 'docs-story',
              },
              createElement('h2', {
                id: headingId,
                children: storyObj.name || name,
              }),
              // createElement('story-canvas', {
              //   id: canvasId,
              //   children: renderComponent(storyObj),
              // }),
              storyObj.parameters &&
                storyObj.parameters['docs'] &&
                storyObj.parameters['docs'].description &&
                typeof storyObj.parameters['docs'].description.story === 'string'
                ? createElement('markdown-html', {
                    value: storyObj.parameters['docs'].description.story,
                  })
                : null,
              createElement('div', {
                className: 'reset-theme',
                children: createElement('div', {
                  className: 'voorbeeld-theme',
                  children: createElement('story-canvas', {
                    children: createElement('story-react', {
                      id: canvasId,
                      args: storyObj.args,
                      defaultArgs,
                      Component: renderer || Component,
                      jsxChange: (evt: CustomEvent) => {
                        const target = document.getElementById(jsxId);
                        if (isJsxSource(target)) {
                          target.jsx = evt.detail.jsx;
                        }
                      },
                    }),
                  }),
                }),
              }),
              storyObj.parameters && storyObj.parameters['tokens'] && !designStory
                ? createElement(
                    'details',
                    {
                      open: true,
                    },
                    ...[createElement('summary', { children: 'Bekijk Design Tokens' }), designTokensEditor],
                  )
                : null,
              // In a design story displaying the design tokens is not optional
              storyObj.parameters && storyObj.parameters['tokens'] && designStory ? designTokensEditor : null,
              showHtml
                ? createElement(
                    'details',
                    {
                      open: true,
                    },
                    createElement('summary', { children: 'HTML en CSS voorbeeldcode' }),
                    createElement('pre', {
                      id: htmlId,
                      children: createElement(
                        'code',
                        {},
                        createElement(
                          'copy-action',
                          {
                            query: `#${htmlId}`,
                          },
                          createElement('button', {
                            style: {
                              float: 'inline-end',
                            },
                            className: 'nl-button nl-button--secondary',
                            children: 'Kopieer HTML',
                          }),
                        ),
                        createElement('code-block', {
                          language: 'html',
                          children: createElement('inner-html', {
                            query: `#${canvasId}`,
                          }),
                        }),
                      ),
                    }),
                  )
                : null,
              showJsx
                ? createElement(
                    'details',
                    {
                      open: true,
                    },
                    createElement('summary', { children: 'React voorbeeldcode' }),
                    createElement('pre', {
                      children: createElement(
                        'code',
                        {},
                        createElement('copy-action', {
                          query: `#${jsxId}`,
                          children: createElement('button', {
                            style: {
                              float: 'inline-end',
                            },
                            className: 'nl-button nl-button--secondary',
                            children: 'Kopieer JSX',
                          }),
                        }),
                        createElement('code-block', {
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
                      ),
                    }),
                  )
                : null,
              showProperties
                ? createElement(
                    'details',
                    {
                      open: false,
                    },
                    createElement('summary', { children: 'Properties' }),
                    createElement('args-table', {
                      target: canvasId,
                      argTypes: this.argTypes,
                      values: {
                        ...storyObj.args,
                        ...defaultArgs,
                      },
                    }),
                  )
                : null,
            );
          }),
      ),
      this,
    );
  }
}
customElements.define('story-list', StoryList);
