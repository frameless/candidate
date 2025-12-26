import { createRoot, Root } from 'react-dom/client';
import { ArgTypes } from '@storybook/react-vite';
import type { InputType } from 'storybook/internal/csf';
import { createElement, FormEvent, ReactNode } from 'react';
import set from 'lodash-es/set';
import get from 'lodash-es/get';

// Token utilities are adapted from:
// https://github.com/nl-design-system/documentatie/blob/main/src/utils.ts
export type TokenNode = { [key: string]: TokenNode }; //| { $type: unknown };
export type TokenPath = string[];

export const tokenPathToDottedTokenPath = (tokenPath: TokenPath): string => tokenPath.join('.');
export const tokenPathToCSSCustomProperty = (tokenPath: TokenPath): string => '--' + tokenPath.join('-');
export const tokenAtPath = (obj: TokenNode, path: TokenPath): TokenNode => path.reduce((acc, key) => acc?.[key], obj);

export function getTokenPaths(obj: TokenNode, partialTokenPath: TokenPath = []): TokenPath[] {
  if (Object.hasOwn(obj, '$type') || Object.hasOwn(obj, '$value')) return [partialTokenPath];

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

export const tokens2css = (tokens: TokenNode, selector = ':root') => {
  const paths = getTokenPaths(tokens);

  const entries = paths.map((path) => [tokenPathToCSSCustomProperty(path), get(tokens, path.join('.'))['$value']]);

  return `${selector} {
${entries.map(([key, value]) => `${key}: ${value};\n`).join('')}}`;
};

customElements.define(
  'design-tokens-table',
  class DesignTokensTable<T = InputType> extends HTMLElement {
    _argTypes: Partial<ArgTypes<T>> = {};
    _values: { [index: string]: unknown } = {};
    renderRoot: Root;
    _tokens: TokenNode = {};
    _theme: TokenNode = {};
    css: string = ''; // temporary, should only expose `_theme`
    themeChange: ((evt: DesignTokensTable) => void) | undefined; // temporary

    set tokens(value: TokenNode) {
      this._tokens = value;
      this.render();
    }
    get tokens() {
      return this._tokens;
    }

    set theme(value: TokenNode) {
      this._theme = value;
      this.render();
    }
    get theme() {
      return this._theme;
    }

    constructor() {
      super();
      this.renderRoot = createRoot(this);
      this.render();
    }
    render() {
      const tokens = this._tokens;

      const tokenPaths = getTokenPaths(tokens);

      type Option = { value: string; children: ReactNode };
      const DesignTokenSelect = ({ options, ...args }: { options: Option[] }) => {
        return createElement('select', {
          ...args,
          children: options.map(({ value, children }) =>
            createElement('option', {
              value,
              children,
            }),
          ),
        });
      };

      const colorPurposes = [
        'default',
        'accent-1',
        'accent-2',
        'accent-3',
        'action-1',
        'action-2',
        'disabled',
        'info',
        'positive',
        'negative',
        'highlight',
        'selected',
      ];

      const createColorScale = (name: string) => [
        { value: `--basis-color-${name}-color-document`, children: `${name} color-document` },
        { value: `--basis-color-${name}-color-subtle`, children: `${name} color-subtle` },
        { value: `--basis-color-${name}-color-active`, children: `${name} color-active` },
        { value: `--basis-color-${name}-color-hover`, children: `${name} color-hover` },
        { value: `--basis-color-${name}-color-default`, children: `${name} color-default` },
        { value: `--basis-color-${name}-border-active`, children: `${name} border-active` },
        { value: `--basis-color-${name}-border-hover`, children: `${name} border-hover` },
        { value: `--basis-color-${name}-border-default`, children: `${name} border-default` },
        { value: `--basis-color-${name}-border-subtle`, children: `${name} border-subtle` },
        { value: `--basis-color-${name}-bg-active`, children: `${name} bg-active` },
        { value: `--basis-color-${name}-bg-hover`, children: `${name} bg-hover` },
        { value: `--basis-color-${name}-bg-default`, children: `${name} bg-default` },
        { value: `--basis-color-${name}-bg-subtle`, children: `${name} bg-subtle` },
        { value: `--basis-color-${name}-bg-document`, children: `${name} bg-document` },
      ];

      const colorScales = Object.fromEntries(colorPurposes.map((name) => [name, createColorScale(name)]));

      const allColors = Object.values(colorScales).flatMap((x) => x);

      const borderColorOnly = (options: Option[]): Option[] =>
        options.filter((option) => option.value.includes('-border-'));
      const backgroundColorOnly = (options: Option[]): Option[] =>
        options.filter((option) => option.value.includes('-bg-'));
      const colorOnly = (options: Option[]): Option[] =>
        options.filter((option) => /-color-(document|subtle|active|hover|default)/.test(option.value));

      const basisFontFamily = [
        { value: 'var(--basis-text-font-family-default)', children: 'default' },
        { value: 'var(--basis-text-font-family-monospace)', children: 'monospace' },
      ];

      const basisBorderRadius = [
        { value: 'var(--basis-border-radius-sm)', children: 'small' },
        { value: 'var(--basis-border-radius-md)', children: 'medium' },
        { value: 'var(--basis-border-radius-lg)', children: 'large' },
        { value: 'var(--basis-border-radius-round)', children: 'round' },
      ];

      const basisBorderWidth = [
        { value: 'var(--basis-border-width-sm)', children: 'small' },
        { value: 'var(--basis-border-width-md)', children: 'medium' },
        { value: 'var(--basis-border-width-lg)', children: 'large' },
      ];

      const basisSpaceRow = [
        { value: 'var(--basis-space-row-6xl)', children: '6xl row' },
        { value: 'var(--basis-space-row-5xl)', children: '5xl row' },
        { value: 'var(--basis-space-row-4xl)', children: '4xl row' },
        { value: 'var(--basis-space-row-3xl)', children: '3xl row' },
        { value: 'var(--basis-space-row-2xl)', children: '2xl row' },
        { value: 'var(--basis-space-row-xl)', children: 'xl row' },
        { value: 'var(--basis-space-row-lg)', children: 'lg row' },
        { value: 'var(--basis-space-row-md)', children: 'md row' },
        { value: 'var(--basis-space-row-sm)', children: 'sm row' },
        { value: 'var(--basis-space-row-xs)', children: 'xs row' },
        { value: 'var(--basis-space-row-2xs)', children: '2xs row' },
      ];

      const basisSpaceColumn = [
        { value: 'var(--basis-space-column-6xl)', children: '6xl column' },
        { value: 'var(--basis-space-column-5xl)', children: '5xl column' },
        { value: 'var(--basis-space-column-4xl)', children: '4xl column' },
        { value: 'var(--basis-space-column-3xl)', children: '3xl column' },
        { value: 'var(--basis-space-column-2xl)', children: '2xl column' },
        { value: 'var(--basis-space-column-xl)', children: 'xl column' },
        { value: 'var(--basis-space-column-lg)', children: 'lg column' },
        { value: 'var(--basis-space-column-md)', children: 'md column' },
        { value: 'var(--basis-space-column-sm)', children: 'sm column' },
        { value: 'var(--basis-space-column-xs)', children: 'xs column' },
        { value: 'var(--basis-space-column-2xs)', children: '2xs column' },
      ];

      const basisSpaceInline = [
        { value: 'var(--basis-space-inline-6xl)', children: '6xl inline' },
        { value: 'var(--basis-space-inline-5xl)', children: '5xl inline' },
        { value: 'var(--basis-space-inline-4xl)', children: '4xl inline' },
        { value: 'var(--basis-space-inline-3xl)', children: '3xl inline' },
        { value: 'var(--basis-space-inline-2xl)', children: '2xl inline' },
        { value: 'var(--basis-space-inline-xl)', children: 'xl inline' },
        { value: 'var(--basis-space-inline-lg)', children: 'lg inline' },
        { value: 'var(--basis-space-inline-md)', children: 'md inline' },
        { value: 'var(--basis-space-inline-sm)', children: 'sm inline' },
        { value: 'var(--basis-space-inline-xs)', children: 'xs inline' },
        { value: 'var(--basis-space-inline-2xs)', children: '2xs inline' },
      ];

      const basisSpaceBlock = [
        { value: 'var(--basis-space-block-6xl)', children: '6xl block' },
        { value: 'var(--basis-space-block-5xl)', children: '5xl block' },
        { value: 'var(--basis-space-block-4xl)', children: '4xl block' },
        { value: 'var(--basis-space-block-3xl)', children: '3xl block' },
        { value: 'var(--basis-space-block-2xl)', children: '2xl block' },
        { value: 'var(--basis-space-block-xl)', children: 'xl block' },
        { value: 'var(--basis-space-block-lg)', children: 'lg block' },
        { value: 'var(--basis-space-block-md)', children: 'md block' },
        { value: 'var(--basis-space-block-sm)', children: 'sm block' },
        { value: 'var(--basis-space-block-xs)', children: 'xs block' },
        { value: 'var(--basis-space-block-2xs)', children: '2xs block' },
      ];

      const basisSize = [
        { value: 'var(--basis-size-2xl)', children: '2xl size' },
        { value: 'var(--basis-size-xl)', children: 'xl size' },
        { value: 'var(--basis-size-lg)', children: 'lg size' },
        { value: 'var(--basis-size-md)', children: 'md size' },
        { value: 'var(--basis-size-sm)', children: 'sm size' },
        { value: 'var(--basis-size-xs)', children: 'xs size' },
        { value: 'var(--basis-size-2xs)', children: '2xs size' },
        { value: 'var(--basis-size-3xs)', children: '3xs size' },
        { value: 'var(--basis-size-4xs)', children: '4xs size' },
        { value: 'var(--basis-size-5xs)', children: '5xs size' },
      ];

      const basisLineHeight = [
        { value: 'var(--basis-text-line-height-4xl)', children: '4xl line-height' },
        { value: 'var(--basis-text-line-height-3xl)', children: '3xl line-height' },
        { value: 'var(--basis-text-line-height-2xl)', children: '2xl line-height' },
        { value: 'var(--basis-text-line-height-xl)', children: 'xl line-height' },
        { value: 'var(--basis-text-line-height-lg)', children: 'lg line-height' },
        { value: 'var(--basis-text-line-height-md)', children: 'md line-height' },
        { value: 'var(--basis-text-line-height-sm)', children: 'sm line-height' },
      ];

      const basisFontSize = [
        { value: 'var(--basis-text-font-size-4xl)', children: '4xl font-size' },
        { value: 'var(--basis-text-font-size-3xl)', children: '3xl font-size' },
        { value: 'var(--basis-text-font-size-2xl)', children: '2xl font-size' },
        { value: 'var(--basis-text-font-size-xl)', children: 'xl font-size' },
        { value: 'var(--basis-text-font-size-lg)', children: 'lg font-size' },
        { value: 'var(--basis-text-font-size-md)', children: 'md font-size' },
        { value: 'var(--basis-text-font-size-sm)', children: 'sm font-size' },
      ];

      const basisFontWeight = [
        { value: 'var(--basis-text-font-weight-bold)', children: 'bold' },
        { value: 'var(--basis-text-font-size-default)', children: 'default' },
      ];

      const basisIcon = [
        { value: 'var(--basis-size-icon-4xl)', children: '4xl' },
        { value: 'var(--basis-size-icon-3xl)', children: '3xl' },
        { value: 'var(--basis-size-icon-2xl)', children: '2xl' },
        { value: 'var(--basis-size-icon-xl)', children: 'xl' },
        { value: 'var(--basis-size-icon-lg)', children: 'lg' },
        { value: 'var(--basis-size-icon-md)', children: 'md' },
        { value: 'var(--basis-size-icon-sm)', children: 'sm' },
      ];

      const scales = [
        {
          parts: ['border-radius'],
          options: basisBorderRadius,
        },
        {
          parts: [
            'padding-inline-start',
            'padding-inline-end',
            'margin-inline-start',
            'margin-inline-end',
            'padding-inline',
            'margin-inline',
          ],
          options: basisSpaceInline,
        },
        {
          parts: [
            'padding-block-start',
            'padding-block-end',
            'margin-block-start',
            'margin-block-end',
            'padding-block',
            'margin-block',
          ],
          options: basisSpaceBlock,
        },
        {
          parts: ['row-gap'],
          options: basisSpaceRow,
        },
        {
          parts: ['column-gap'],
          options: basisSpaceColumn,
        },
        {
          parts: ['font-family'],
          options: basisFontFamily,
        },
        {
          parts: ['font-size'],
          options: basisFontSize,
        },
        {
          parts: ['font-weight'],
          options: basisFontWeight,
        },
        {
          parts: ['line-height'],
          options: basisLineHeight,
        },
        {
          parts: ['block-size', 'min-block-size', 'max-block-size'],
          options: basisSize,
        },
        {
          parts: ['inline-size', 'min-inline-size', 'max-inline-size'],
          options: basisSize,
        },
        {
          // `size` isn't really a CSS token, but useful for icon.size
          // TODO: Detect if it is `.icon.size`, the only show icon scale
          parts: ['size'],
          options: basisSize,
        },
        {
          parts: ['color', 'text-decoration-color'],
          options: colorOnly(allColors),
        },
        {
          parts: ['border-color', 'outline-color', 'outline-offset', 'text-decoration-thickness'],
          options: borderColorOnly(allColors),
        },
        {
          parts: ['background-color'],
          options: backgroundColorOnly(allColors),
        },
        {
          parts: ['border-width', 'outline-width'],
          options: basisBorderWidth,
        },
        {
          parts: ['cursor'],
          options: [
            { value: 'normal', children: 'normal' },
            { value: 'pointer', children: 'pointer' },
            { value: 'wait', children: 'wait' },
            { value: 'text', children: 'text' },
            { value: 'not-allowed', children: 'not-allowed' },
            // TODO: Add all cursor options
          ],
        },
        {
          parts: ['text-decoration-line'],
          options: [
            { value: 'none', children: 'none' },
            { value: 'solid', children: 'solid' },
            // TODO: Add all cursor options
          ],
        },
      ];

      const setToken = (path: TokenPath, value: string) => {
        const newTheme = {
          ...this._theme,
        };
        set(newTheme, path.join('.'), { $value: value });
        this._theme = newTheme;
        this.css = tokens2css(this._theme, '.example-theme');
        const evt = new CustomEvent('themeChange');
        if (this.themeChange) {
          this.themeChange(this);
        }
        this.dispatchEvent(evt);
      };

      // Render new version
      this.renderRoot.render([
        createElement('dl', {
          children: tokenPaths.map((path) => {
            const id = path.join('.');
            const args = {
              id,
              onInput: (evt: FormEvent<HTMLInputElement>) => {
                const cssValue = evt.target.value;
                if (typeof cssValue === 'string') {
                  const cssProperty = `--${path.join('-')}`;
                  console.log(`${cssProperty}: ${cssValue}`);
                  setToken(path, cssValue);
                  document.documentElement.style.setProperty(cssProperty, cssValue);
                }
              },
            };

            let designTokenInput: ReactNode = createElement('input', {
              ...args,
            });

            const tokenScale = scales.find((scale) => scale.parts.includes(path.at(-1) || ''));

            let options: Option[] = [];

            if (tokenScale) {
              options = tokenScale.options;
            }

            if (path.at(-1) === 'size' && path.at(-2) === 'icon') {
              options = basisIcon;
            }

            if (tokenScale) {
              // TODO: If it is a `negative` token, prioritize the `negative` color scale
              // TODO: If it is a `positive` token, prioritize the `positive` color scale
              // TODO: If it is a `info` token, prioritize the `info` color scale
              // TODO: If it is a `selected` token, prioritize the `selected` color scale
              // TODO: If it is a `highlight` token, prioritize the `highlight` color scale
              // TODO: If it is a `disabled` token, prioritize the `disabled` color scale
              // TODO: If it is a `hover` token, prioritize the `hover` colors
              // TODO: If it is a `active` token, prioritize the `active` colors
              designTokenInput = createElement(DesignTokenSelect, {
                ...args,
                options: options,
              });
            }

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
                    children: designTokenInput,
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
