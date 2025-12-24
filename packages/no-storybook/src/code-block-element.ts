import prettier from 'prettier';
import prettierHtml from 'prettier/plugins/html.mjs';
import Prism from 'prismjs/components/prism-core.js';
import prismCss from 'prismjs/themes/prism.min.css?inline';
import 'prismjs/components/prism-markup.js';

customElements.define(
  'code-block',
  class CodeBlockElement extends HTMLElement {
    target: Element | null = null;
    observer: MutationObserver;
    shadow: ShadowRoot;
    span: HTMLSpanElement;
    language: string = '';
    constructor() {
      super();
      this.target = this;
      this.observer = new MutationObserver((_changes) => {
        this.render();
      });
      this.shadow = this.attachShadow({ mode: 'open' });
      this.span = this.shadow.appendChild(this.ownerDocument.createElement('span'));
      this.language = this.getAttribute('language') || '';
      const style = this.ownerDocument.createElement('style');
      style.appendChild(this.ownerDocument.createTextNode(prismCss));
      this.shadow.appendChild(style);

      this.render();
    }
    connectedCallback() {
      this.observer.observe(this, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
    render() {
      let code = this.textContent;

      (async () => {
        code =
          '<p><span class="foo">Nulla cum perspiciatis autem veritatis perspiciatis consequatur reprehenderit quo. In autem suscipit dolor voluptatem consequatur maiores. Aut quo nihil vero ea aperiam dolores dignissimos. Omnis debitis illum nisi quas.</span></p>';
        code = await prettier.format(code, { parser: 'html', plugins: [prettierHtml] });
        if (this.language) {
          // await loadLanguage(this.language);
          code = Prism.highlight(code, Prism.languages[this.language], this.language);
          this.span.innerHTML = code;
        } else {
          this.span.textContent = code;
        }
      })();
    }
    disconnectedCallback() {
      this.observer.disconnect();
    }
  },
);
