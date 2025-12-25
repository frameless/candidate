import { createRoot, Root } from 'react-dom/client';
import { createElement } from 'react';
import Markdown from 'react-markdown';

customElements.define(
  'markdown-html',
  class MarkdownHtmlElement extends HTMLElement {
    _value: string = '';
    renderRoot: Root;
    set value(value: string) {
      this._value = value;
      this.render();
    }
    get value() {
      return this._value;
    }

    constructor() {
      super();
      this.renderRoot = createRoot(this);
      this.render();
      this._value = this.getAttribute('value') || '';
    }
    render() {
      this.renderRoot.render(
        createElement(Markdown, {
          children: this.value,
        }),
      );
    }
  },
);
