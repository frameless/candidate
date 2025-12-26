import type { StoryObj } from '@storybook/react-vite';
import type { ParagraphProps } from '@nl-design-system-candidate/paragraph-react';

type Story = StoryObj<ParagraphProps>;

export const Paragraph: Story = {
  name: 'Paragraph',
  args: {
    children: 'Op brute wĳze ving de schooljuf de quasi-kalme lynx.',
    purpose: undefined,
  },
  parameters: {
    tokens: {
      nl: {
        paragraph: {
          'font-size': { $value: '' },
          'font-weight': { $value: '' },
          'line-height': { $value: '' },
          'margin-block-start': { $value: '' },
          'margin-block-end': { $value: '' },
        },
      },
    },
  },
};

export const Lead: Story = {
  name: 'Paragraph Lead',
  args: {
    children: 'Op brute wĳze ving de schooljuf de quasi-kalme lynx.',
    purpose: 'lead',
  },
  parameters: {
    tokens: {
      nl: {
        paragraph: {
          lead: {
            'font-size': { $value: '' },
            'font-weight': { $value: '' },
            'line-height': { $value: '' },
            'margin-block-start': { $value: '' },
            'margin-block-end': { $value: '' },
          },
        },
      },
    },
  },
};
