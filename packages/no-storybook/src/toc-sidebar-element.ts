import { createRoot, Root } from 'react-dom/client';
import { createElement, type ReactNode } from 'react';
import { SideNavigation } from '@gemeente-denhaag/side-navigation';
import throttle from 'lodash-es/throttle';

interface SidebarItem {
  href: string;
  label: string;
  icon: ReactNode;
  current?: boolean;
  counter?: number;
}

customElements.define(
  'toc-sidebar',
  class TocSidebar extends HTMLElement {
    _items: SidebarItem[] = [];
    renderRoot: Root;
    observer: MutationObserver;
    throttleScan: () => void;
    query: string = 'h2[id]';
    set items(value: SidebarItem[]) {
      this._items = value;
      this.render();
    }
    get items() {
      return this._items;
    }

    constructor() {
      super();
      this.renderRoot = createRoot(this);
      this.throttleScan = throttle(() => this.scan(), 250);
      const query = this.getAttribute('query');
      if (query) {
        this.query = query;
      }
      this.render();

      this.scan();
      this.observer = new MutationObserver(this.throttleScan);
    }

    connectedCallback() {
      this.observer.observe(this.ownerDocument.documentElement, {
        subtree: true,
        childList: true,
      });
    }
    disconnectedCallback() {
      this.observer.disconnect();
    }

    scan() {
      const headings = document.querySelectorAll(this.query);
      this.items = Array.from(headings).map((heading) => {
        return {
          href: `#${heading.id}`,
          label: heading.textContent,
          icon: '',
        };
      });
    }
    render() {
      const { items: _items } = this;

      // Render new version
      this.renderRoot.render([createElement(SideNavigation, { items: [this._items] })]);
    }
  },
);
