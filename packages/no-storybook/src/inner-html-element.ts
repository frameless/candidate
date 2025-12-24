const ATTR_QUERY = 'query';

customElements.define(
  'inner-html',
  class InnerHTMLElement extends HTMLElement {
    static observedAttributes = [ATTR_QUERY];
    target: Element | null = null;
    observer: MutationObserver | null = null;

    constructor() {
      super();
      this.render();
    }
    connectedCallback() {
      const query = this.getAttribute(ATTR_QUERY);
      this.target = query ? this.ownerDocument.querySelector(query) : null;

      this.observer = new MutationObserver(() => {
        this.render();
      });

      if (this.target) {
        this.observer.observe(this.target, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
        });
      }

      this.render();
    }
    render() {
      this.textContent = this.target ? this.target.innerHTML : '';
    }
    disconnectedCallback() {
      this.observer?.disconnect();
    }
  },
);
