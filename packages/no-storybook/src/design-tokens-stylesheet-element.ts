import { type ReactNode } from 'react';
import { TokenNode, TokenPath, tokenPathToCSSCustomProperty } from './design-tokens-table-element';
import { cloneDeep, set, unset } from 'lodash-es';

export interface JsxChangeEvent {
  detail: {
    jsx: ReactNode;
  };
}

export interface DesignTokensStylesheetInterface extends HTMLElement {
  selector: string;
  readonly styleSheet: CSSStyleSheet;
  tokens: TokenNode;
}

export class DesignTokensStylesheetElement extends HTMLElement implements DesignTokensStylesheetInterface {
  _tokens = {};
  _styleSheet: CSSStyleSheet = new CSSStyleSheet();
  _selector: string = ':root';
  static observedAttributes = ['selector'];

  set tokens(value: TokenNode) {
    this._tokens = value;
  }
  get tokens() {
    return this._tokens;
  }
  set selector(value: string) {
    this._selector = value;
  }
  get selector() {
    return this._selector;
  }

  get styleSheet() {
    return this._styleSheet;
  }

  constructor() {
    super();
    const selector = this.getAttribute('selector');
    if (selector) {
      this._selector = selector;
    }
    this._styleSheet.replaceSync(`${this._selector} {}`);
  }
  connectedCallback() {
    this.ownerDocument.adoptedStyleSheets.push(this._styleSheet);
  }
  disconnectedCallback() {
    const removeAdoptedStylesheet = (node: Document | ShadowRoot, item: CSSStyleSheet) =>
      (node.adoptedStyleSheets = [...node.adoptedStyleSheets].filter((x) => x !== item));

    removeAdoptedStylesheet(this.ownerDocument, this._styleSheet);
  }
  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === 'selector') {
      this.selector = newValue;
      const rule = this.styleSheet.cssRules[0];
      if (rule instanceof CSSStyleRule) {
        rule.selectorText = newValue;
      }
    }
  }

  setToken(path: TokenPath, $value: string) {
    const newTheme = cloneDeep(this._tokens);
    set(newTheme, path, { $value });
    this._tokens = newTheme;
    const rule = this._styleSheet.cssRules[0];
    if (rule instanceof CSSStyleRule) {
      rule.style.setProperty(tokenPathToCSSCustomProperty(path), $value);
    }
  }

  unsetToken(path: TokenPath) {
    const newTheme = cloneDeep(this._tokens);
    unset(newTheme, path);
    this._tokens = newTheme;
    const rule = this._styleSheet.cssRules[0];
    if (rule instanceof CSSStyleRule) {
      rule.style.removeProperty(tokenPathToCSSCustomProperty(path));
    }
  }
}

/**
 * ...
 */
customElements.define('design-tokens-stylesheet', DesignTokensStylesheetElement);
