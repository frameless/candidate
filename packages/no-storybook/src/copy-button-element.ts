/**
 * Specify a CSS selector to copy an elements text content:
 *
 * <copy-action query="pre > code">
 *   <button type="text">Copy code</button>
 * </copy-action>
 *
 * Or copy text:
 *
 * <copy-action text="Never gonna give you up, never gonna let you down!">
 *   <button type="text">Copy lyrics</button>
 * </copy-action>
 */
customElements.define(
  'copy-action',
  class CopyActionElement extends HTMLElement {
    static observedAttributes = ['text'];
    target: Element | null = null;
    _text: string = '';
    override shadowRoot: ShadowRoot;
    constructor() {
      super();
      this.shadowRoot = this.attachShadow({ mode: 'open' });
      this.style.display = 'contents';
      const text = this.getAttribute('text');
      if (text) {
        this._text = text;
      }
      this.render();
    }

    set text(value: string) {
      if (typeof value === 'string') {
        this._text = value;
        this.setAttribute('text', value);
      } else {
        throw new TypeError();
      }
    }
    get text() {
      return this._text;
    }

    attributeChangedCallback(name: string, _: string, newValue: string) {
      if (name === 'text') {
        this._text = newValue;
      }
    }

    render() {
      while (this.shadowRoot.lastChild) {
        this.shadowRoot.removeChild(this.shadowRoot.lastChild);
      }
      const slot = this.ownerDocument.createElement('slot');
      // slot.setAttribute('name', 'button');
      slot.addEventListener('slotchange', (evt) => {
        if (evt.target) {
          evt.target.addEventListener('click', () => {
            this.copy();
          });
        }
      });
      this.shadowRoot.appendChild(slot);
    }

    copy() {
      const query = this.getAttribute('query');
      const target = query ? this.ownerDocument.querySelector(query) : null;
      let text = '';
      if (query) {
        if (target) {
          text = target.textContent;
        }
      } else if (this._text) {
        text = this._text;
      }

      if (text) {
        navigator.clipboard.writeText(text);
      }
    }
  },
);
