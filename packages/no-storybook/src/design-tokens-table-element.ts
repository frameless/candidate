import { createRoot, Root } from 'react-dom/client';
import { ArgTypes } from '@storybook/react-vite';
import type { InputType } from 'storybook/internal/csf';
import { createElement, FormEvent } from 'react';

// Token utilities are adapted from:
// https://github.com/nl-design-system/documentatie/blob/main/src/utils.ts
export type TokenNode = { [key: string]: TokenNode }; //| { $type: unknown };
export type TokenPath = string[];

export const tokenPathToDottedTokenPath = (tokenPath: TokenPath): string => tokenPath.join('.');
export const tokenPathToCSSCustomProperty = (tokenPath: TokenPath): string => '--' + tokenPath.join('-');
export const tokenAtPath = (obj: TokenNode, path: TokenPath): TokenNode => path.reduce((acc, key) => acc?.[key], obj);

export function getTokenPaths(obj: TokenNode, partialTokenPath: TokenPath = []): TokenPath[] {
  if (Object.hasOwn(obj, '$type')) return [partialTokenPath];

  return Object.keys(obj).flatMap((key) =>
    typeof obj[key] === 'object' && obj[key] !== null ? getTokenPaths(obj[key], [...partialTokenPath, key]) : [],
  );
}

export function sortTokenPaths(tokenPaths: TokenPath[]): TokenPath[] {
  const memo = new Map<TokenPath, string>();

  function getKey(tokenPath: TokenPath): string {
    if (!memo.has(tokenPath)) {
      memo.set(tokenPath, tokenPathToDottedTokenPath(tokenPath));
    }
    return memo.get(tokenPath) ?? '';
  }

  return tokenPaths.sort((a, b) => a.length - b.length || getKey(a).localeCompare(getKey(b)));
}

customElements.define(
  'design-tokens-table',
  class DesignTokensTable<T = InputType> extends HTMLElement {
    _argTypes: Partial<ArgTypes<T>> = {};
    _values: { [index: string]: unknown } = {};
    renderRoot: Root;
    _tokens: TokenNode = {};

    set tokens(value: TokenNode) {
      this._tokens = value;
      this.render();
    }
    get tokens() {
      return this._tokens;
    }

    constructor() {
      super();
      this.renderRoot = createRoot(this);
      this.render();
    }
    render() {
      const tokens = this._tokens;

      const tokenPaths = getTokenPaths(tokens);
      // Render new version
      this.renderRoot.render([
        createElement('dl', {
          children: tokenPaths.map((path) => {
            const id = path.join('.');
            return [
              createElement('div', {
                children: [
                  createElement('dt', {
                    children: createElement('label', {
                      htmlFor: id,
                      children: id,
                    }),
                  }),
                  createElement('dd', {
                    children: createElement('input', {
                      id,
                      onInput: (evt: FormEvent<HTMLInputElement>) => {
                        const cssValue = evt.target.value;
                        if (typeof cssValue === 'string') {
                          const cssProperty = `--${path.join('-')}`;
                          console.log(`${cssProperty}: ${cssValue}`);
                          document.documentElement.style.setProperty(cssProperty, cssValue);
                        }
                      },
                    }),
                  }),
                ],
              }),
            ];
          }),
        }),
      ]);
    }
  },
);
