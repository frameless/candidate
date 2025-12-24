import { render, createElement } from 'preact';

customElements.define(
  'story-list-preact',
  class StoryReact extends HTMLElement {
    constructor() {
      super();
      import(this.getAttribute('src')).then((stories) => {
        const Component = stories.default.component;
        const defaultArgs = stories.default.args;
        this.title = stories.default.title;
        this.stories = stories;
        this.Component = Component;
        this.defaultArgs = defaultArgs;
        this.render();
      });
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
            createElement('h1', { children: this.title }),
            ...Object.entries(stories)
              .filter(([name]) => name !== 'default')
              .map(([name, storyObj], index) => [
                createElement('h2', { children: storyObj.name || name }),
                createElement('story-canvas', {
                  id: `story-${index}`,
                  children: createElement(Component, {
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
