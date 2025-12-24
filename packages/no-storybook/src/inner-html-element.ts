customElements.define(
  'inner-html',
  class InnerHTMLElement extends HTMLElement {
    static observedAttributes = ['ref'];

    constructor() {
      super();
      this.render();
    }
    connectedCallback() {
      this.target = this.ownerDocument.querySelector(this.getAttribute('query'));

      this.observer = new MutationObserver(() => {
        this.render();
      });
      this.observer.observe(this.target, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
      });
      this.render();
    }
    render() {
      this.textContent = this.target ? this.target.innerHTML : '';
    }
    disconnectedCallback() {
      this.observer.disconnect();
    }
  },
);
