import { render, createElement } from 'preact';
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
      const { Component, stories, defaultArgs } = this;
      // Remove current rendering
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }

      // Render new version
      render(
        createElement('div', {
          children: [
            createElement('h1', { children: this.storyTitle }),
            ...Object.entries(stories)
              .filter(([name]) => name !== 'default')
              .map(([name, storyObj], index) => [
                createElement('h2', { children: storyObj.name || name }),
                createElement('story-canvas', {
                  id: `story-${index}`,
                  children:
                    Component &&
                    createElement(Component as never, {
                      ...defaultArgs,
                      ...storyObj.args,
                    }),
                }),
                createElement('pre', {
                  children: createElement('code', {
                    children: createElement('code-block', {
                      language: 'html',
                      children: createElement('inner-html', {
                        query: `#story-${index}`,
                      }),
                    }),
                  }),
                }),
              ]),
          ],
        }),
        this,
      );
    }
  },
);
