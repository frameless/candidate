import { createElement, FormEvent, HTMLAttributes, PropsWithChildren, useEffect, useRef } from 'react';

// Incomplete type, but works for my purpose
interface ClippyFontComboboxElement extends Omit<HTMLAttributes<HTMLElement>, 'defaultValue' | 'onInput'> {
  options: { label: string; value: string }[];
  onInput?: (evt: FormEvent<ClippyFontComboboxElement>) => void;
  value?: string | null;
  defaultValue?: string;
}

export const ClippyFontCombobox = ({
  onInput,
  value = null,
  defaultValue,
  ...restProps
}: PropsWithChildren<ClippyFontComboboxElement>) => {
  const ref = useRef<ClippyFontComboboxElement | undefined>(undefined);

  // Implement `defaultValue`
  // (probably badly)
  useEffect(() => {
    if (value !== null) {
      if (ref.current) {
        ref.current.value = value;
      }
    } else if (defaultValue !== null) {
      if (ref.current) {
        ref.current.value = defaultValue;
      }
    }
  }, [value, defaultValue]);

  return createElement('clippy-font-combobox', {
    ...restProps,
    ref,
  });
};
