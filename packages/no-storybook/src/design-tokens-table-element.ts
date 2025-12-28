import { createRoot, Root } from 'react-dom/client';
import { ArgTypes } from '@storybook/react-vite';
import type { InputType } from 'storybook/internal/csf';
import { createElement, FormEvent, ReactNode, SelectHTMLAttributes } from 'react';
import set from 'lodash-es/set';
import get from 'lodash-es/get';
import { cloneDeep, unset } from 'lodash-es';
import { DesignTokensStylesheetElement } from './design-tokens-stylesheet-element';

// Token utilities are adapted from:
// https://github.com/nl-design-system/documentatie/blob/main/src/utils.ts
export type Token = { $value?: string; $type?: string; $extensions?: { [key: string]: unknown } }; //| { $type: unknown };
export type TokenGroup = { $extensions?: { [key: string]: unknown } };
export type TokenNode = { [key: string]: TokenNode | Token } & TokenGroup; //| { $type: unknown };
export type TokenPath = string[];

getTokenPaths({
  nl: {
    code: {
      'background-color': {
        $extensions: {
          'nl.nldesignsystem.css-property-syntax': '<color>',
          'nl.nldesignsystem.figma-implementation': true,
        },
        $type: 'color',
      },
      color: {
        $extensions: {
          'nl.nldesignsystem.css-property-syntax': '<color>',
          'nl.nldesignsystem.figma-implementation': true,
        },
        $type: 'color',
      },
      'font-family': {
        $extensions: {
          'nl.nldesignsystem.css-property-syntax': ['<family-name>', '<generic-name>'],
          'nl.nldesignsystem.figma-implementation': true,
        },
        $type: 'fontFamilies',
      },
      'font-size': {
        $extensions: {
          'nl.nldesignsystem.css-property-syntax': ['<length>', '<percentage>'],
          'nl.nldesignsystem.figma-implementation': true,
        },
        $type: 'fontSizes',
      },
    },
  },
});
export const tokenPathToDottedTokenPath = (tokenPath: TokenPath): string => tokenPath.join('.');
export const tokenPathToCSSCustomProperty = (tokenPath: TokenPath): string => '--' + tokenPath.join('-');
export const tokenPathToCSSVariable = (tokenPath: TokenPath): string => `var(--${tokenPath.join('-')})`;
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

  const entries = paths.map((path) => [
    tokenPathToCSSCustomProperty(path),
    get(tokens, tokenPathToDottedTokenPath(path))['$value'],
  ]);

  return `${selector} {
${entries.map(([key, value]) => `${key}: ${value};\n`).join('')}}`;
};

export const excludeTokens = (allTokens: TokenNode, excludeTokens: TokenNode): TokenNode => {
  const excludePaths = getTokenPaths(excludeTokens);
  const subsetTokens = cloneDeep(allTokens);
  excludePaths.forEach((excludePath: TokenPath) => {
    unset(subsetTokens, excludePath.join('.'));
  });
  return subsetTokens;
};

export interface DesignTokensTableInterface extends HTMLElement {
  css: string;
  tokens: TokenNode;
  defaultTokens: TokenNode;
  themeChange: ((evt: DesignTokensTableInterface) => void) | undefined;
}

customElements.define(
  'design-tokens-table',
  class DesignTokensTable<T = InputType> extends HTMLElement implements DesignTokensTableInterface {
    _argTypes: Partial<ArgTypes<T>> = {};
    _values: { [index: string]: unknown } = {};
    renderRoot: Root;
    _tokens: TokenNode = {};
    _defaultTokens: TokenNode = {};
    _theme: TokenNode = {};
    css: string = ''; // temporary, should only expose `_theme`
    themeChange: ((evt: DesignTokensTableInterface) => void) | undefined; // temporary

    set tokens(value: TokenNode) {
      this._tokens = value;
      this.render();
    }
    get tokens() {
      return this._tokens;
    }

    set defaultTokens(value: TokenNode) {
      this._defaultTokens = value;
      this.render();
    }
    get defaultTokens() {
      return this._defaultTokens;
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
      this.setAttribute('default', '');

      const tokenPaths = getTokenPaths(tokens);

      type Option = { value: string; children: ReactNode };
      const DesignTokenSelect = ({
        options,
        ...args
      }: { options: Option[] } & SelectHTMLAttributes<HTMLSelectElement>) => {
        return createElement('select', {
          ...args,
          children: options.map(({ value, children }) =>
            createElement('option', {
              key: value,
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
        'default-inverse',
        'accent-1-inverse',
        'accent-2-inverse',
        'accent-3-inverse',
        'action-1-inverse',
        'action-2-inverse',
        'disabled-inverse',
        'info-inverse',
        'positive-inverse',
        'negative-inverse',
        'highlight-inverse',
        'selected-inverse',
      ];

      const createColorScale = (name: string) => [
        { value: `var(--basis-color-${name}-color-document)`, children: `${name} color-document` },
        { value: `var(--basis-color-${name}-color-subtle)`, children: `${name} color-subtle` },
        { value: `var(--basis-color-${name}-color-active)`, children: `${name} color-active` },
        { value: `var(--basis-color-${name}-color-hover)`, children: `${name} color-hover` },
        { value: `var(--basis-color-${name}-color-default)`, children: `${name} color-default` },
        { value: `var(--basis-color-${name}-border-active)`, children: `${name} border-active` },
        { value: `var(--basis-color-${name}-border-hover)`, children: `${name} border-hover` },
        { value: `var(--basis-color-${name}-border-default)`, children: `${name} border-default` },
        { value: `var(--basis-color-${name}-border-subtle)`, children: `${name} border-subtle` },
        { value: `var(--basis-color-${name}-bg-active)`, children: `${name} bg-active` },
        { value: `var(--basis-color-${name}-bg-hover)`, children: `${name} bg-hover` },
        { value: `var(--basis-color-${name}-bg-default)`, children: `${name} bg-default` },
        { value: `var(--basis-color-${name}-bg-subtle)`, children: `${name} bg-subtle` },
        { value: `var(--basis-color-${name}-bg-document)`, children: `${name} bg-document` },
      ];
      const transparentColor = { value: `var(--basis-color-transparent)`, children: `transparent` };
      const focusBorderColor = { value: `var(--basis-focus-border)`, children: `focus border color` };
      const focusColor = { value: `var(--basis-focus-color)`, children: `focus color` };
      const focusBackgroundColor = { value: `var(--basis-focus-background-color)`, children: `focus background color` };
      const pointerTargetInlineSize = {
        value: `var(--basis-pointer-target-min-inline-size)`,
        children: 'pointer target inline',
      };
      const pointerTargetBlockSize = {
        value: `var(--basis-pointer-target-min-block-size)`,
        children: 'pointer target block',
      };
      const pointerTargetSize = [pointerTargetBlockSize, pointerTargetInlineSize];

      const colorScales = Object.fromEntries(colorPurposes.map((name) => [name, createColorScale(name)]));

      const allColors = Object.values(colorScales).flatMap((x) => x);

      const borderColorOnly = (options: Option[]): Option[] =>
        options.filter((option) => option.value.includes('-border-'));
      const backgroundColorOnly = (options: Option[]): Option[] =>
        options.filter((option) => option.value.includes('-bg-'));
      const colorOnly = (options: Option[]): Option[] =>
        options.filter((option) => /-color-(document|subtle|active|hover|default)/.test(option.value));

      const headingFontFamily = {
        value: 'var(--basis-heading-font-family)',
        children: 'heading font family',
      };
      const headingFontWeight = {
        value: 'var(--basis-heading-font-weight)',
        children: 'heading font weight',
      };

      const headingColor = {
        value: 'var(--basis-heading-color)',
        children: 'heading color',
      };

      const noSpace = { value: '0px', children: '0' };
      const noBorderRadius = { value: '0px', children: 'square corners' };
      const noBorderWidth = { value: '0px', children: 'no border' };

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

      const basisSpaceText = [
        { value: 'var(--basis-space-text-6xl)', children: '6xl text' },
        { value: 'var(--basis-space-text-5xl)', children: '5xl text' },
        { value: 'var(--basis-space-text-4xl)', children: '4xl text' },
        { value: 'var(--basis-space-text-3xl)', children: '3xl text' },
        { value: 'var(--basis-space-text-2xl)', children: '2xl text' },
        { value: 'var(--basis-space-text-xl)', children: 'xl text' },
        { value: 'var(--basis-space-text-lg)', children: 'lg text' },
        { value: 'var(--basis-space-text-md)', children: 'md text' },
        { value: 'var(--basis-space-text-sm)', children: 'sm text' },
        { value: 'var(--basis-space-text-xs)', children: 'xs text' },
        { value: 'var(--basis-space-text-2xs)', children: '2xs text' },
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
        { value: 'var(--basis-text-font-weight-default)', children: 'default' },
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
          options: [noBorderRadius, ...basisBorderRadius],
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
          options: [noSpace, ...basisSpaceInline],
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
          options: [noSpace, ...basisSpaceBlock],
        },
        {
          parts: ['row-gap'],
          options: basisSpaceRow,
        },
        {
          parts: ['column-gap'],
          options: [...basisSpaceColumn, ...basisSpaceText],
        },
        {
          parts: ['font-family'],
          options: [...basisFontFamily, headingFontFamily],
        },
        {
          parts: ['font-size'],
          options: basisFontSize,
        },
        {
          parts: ['font-weight'],
          options: [...basisFontWeight, headingFontWeight],
        },
        {
          parts: ['line-height'],
          options: basisLineHeight,
        },
        {
          parts: ['block-size', 'min-block-size', 'max-block-size'],
          options: [...basisSize, pointerTargetBlockSize],
        },
        {
          parts: ['inline-size', 'min-inline-size', 'max-inline-size'],
          options: [...basisSize, pointerTargetInlineSize],
        },
        {
          // `size` isn't really a CSS token, but useful for icon.size
          // TODO: Detect if it is `.icon.size`, the only show icon scale
          parts: ['size'],
          options: [...basisSize, ...pointerTargetSize],
        },
        {
          parts: ['color', 'text-decoration-color'],
          options: [...colorOnly(allColors), transparentColor, focusColor, headingColor],
        },
        {
          parts: ['border-color', 'outline-color'],
          options: [...borderColorOnly(allColors), transparentColor, focusBorderColor],
        },
        {
          parts: ['background-color'],
          options: [...backgroundColorOnly(allColors), transparentColor, focusBackgroundColor],
        },
        {
          parts: ['border-width', 'outline-width', 'outline-offset', 'text-decoration-thickness'],
          options: [noBorderWidth, ...basisBorderWidth],
        },
        {
          parts: ['cursor'],
          options: [
            { value: 'default', children: 'default' },
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
            { value: 'underline', children: 'underline' },
            // TODO: Add all cursor options
          ],
        },
      ];

      const setToken = (path: TokenPath, value: string | undefined) => {
        const newTheme = {
          ...this._theme,
        };
        if (typeof value === 'undefined') {
          unset(newTheme, tokenPathToDottedTokenPath(path));
        } else {
          set(newTheme, tokenPathToDottedTokenPath(path), { $value: value });
        }
        this._theme = newTheme;
        this.css = tokens2css(this._theme, '.example-theme');
        const evt = new CustomEvent('themeChange');
        if (this.themeChange) {
          this.themeChange(this);
        }
        const isDirty = getTokenPaths(this.theme).length > 0;
        if (isDirty) {
          this.setAttribute('not-default', '');
          this.removeAttribute('default');
        } else {
          this.setAttribute('default', '');
          this.removeAttribute('not-default');
        }

        this.dispatchEvent(evt);
        this.render();
      };

      // Hack
      const tokenRefToCss = (arg: string) => arg.replace(/\./g, '-').replace(/^{(.+)}$/, 'var(--$1)');

      // Render new version
      this.renderRoot.render([
        createElement('dl', {
          children: tokenPaths.map((path) => {
            const id = tokenPathToDottedTokenPath(path);
            const token = get(this._theme, id);
            const defaultToken = get(this._defaultTokens, id);
            const originalToken =
              defaultToken &&
              ((defaultToken as unknown as TokenNode & { original: TokenNode })['original'] as unknown as TokenNode);
            const originalValue =
              originalToken && typeof originalToken['$value'] === 'string' ? originalToken['$value'] : undefined;
            const originalCssValue = originalValue ? tokenRefToCss(originalValue) : undefined;
            const defaultValue = token ? token['$value'] : originalValue ? originalCssValue : undefined;
            const cssProperty = tokenPathToCSSCustomProperty(path);

            // TODO: Replace with checking token[$type] === 'color'
            const isColor = /color/.test(path.at(-1) || '');
            // console.log(id, defaultValue);
            const args = {
              id,
              defaultValue: String(defaultValue),
              title: originalValue,
              onInput: (evt: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
                const cssValue =
                  evt.target instanceof HTMLInputElement || evt.target instanceof HTMLSelectElement
                    ? evt.target.value
                    : undefined;
                if (typeof cssValue === 'string') {
                  setToken(path, cssValue);
                  const designTokensStylesheet = document.querySelector('design-tokens-stylesheet');

                  if (designTokensStylesheet instanceof DesignTokensStylesheetElement) {
                    designTokensStylesheet?.setToken(path, cssValue);
                  }
                  // document.documentElement.style.setProperty(cssProperty, cssValue);
                }
              },
            };

            let designTokenInput: ReactNode = createElement('input', {
              ...args,
            });

            const tokenScale = scales.find((scale) => scale.parts.includes(path.at(-1) || ''));

            let options: Option[] = [];

            const createOptionKeys = (options: Option[]) =>
              options.map((option) => ({
                key: option.value,
                ...option,
              }));

            if (tokenScale) {
              options = createOptionKeys(tokenScale.options);
            }

            if (path.at(-1) === 'size' && path.at(-2) === 'icon') {
              options = basisIcon;
            }

            // const compareCaseInsensitive = (a: string, b: string) => a === b || a.toLowerCase() === b.toLowerCase();
            // const valueExistsAsOption =
            //   !originalValue || !options.some(({ value }) => compareCaseInsensitive(value, originalCssValue || ''));
            const valueExistsAsOption = !originalValue || !options.some(({ value }) => value === originalCssValue);
            const unknownOption: Option = {
              value: '',
              children: originalValue,
            };
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
                ['aria-invalid']: valueExistsAsOption ? 'true' : undefined,
                options: createOptionKeys(valueExistsAsOption ? [unknownOption, ...options] : options),
              });
            }

            return [
              createElement('div', {
                key: id,
                children: [
                  createElement('dt', {
                    children: createElement('label', {
                      htmlFor: id,
                      children: createElement('code', {
                        htmlFor: id,
                        children: id,
                      }),
                    }),
                  }),
                  createElement('dd', {
                    children: [
                      designTokenInput,
                      isColor
                        ? createElement('data', {
                            className: 'nl-color-sample',
                            style: {
                              backgroundImage: 'none',
                              backgroundColor: `var(${cssProperty})`,
                            },
                          })
                        : null,
                      get(this._theme, id)
                        ? createElement('button', {
                            className: 'nl-button nl-button--subtle',
                            children: 'Reset',
                            onClick: () => {
                              setToken(path, undefined);
                              const designTokensStylesheet = document.querySelector('design-tokens-stylesheet');

                              if (designTokensStylesheet instanceof DesignTokensStylesheetElement) {
                                designTokensStylesheet.unsetToken(path);
                              }
                            },
                          })
                        : null,
                    ],
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
