import type { StoryObj } from '@storybook/react-vite';
import type { NumberBadgeProps } from '@nl-design-system-candidate/number-badge-react';

type Story = StoryObj<NumberBadgeProps>;

export const NumberBadge: Story = {
  name: 'Number Badge',
  args: {
    children: '42',
  },
};

export const NumberBadgeMetValue: Story = {
  name: 'Number Badge met "value"',
  args: {
    children: '42',
    value: 42,
  },
};

export const NumberBadgeMetLabel: Story = {
  name: 'Number Badge met "label"',
  args: {
    children: '42',
    label: '42 ongelezen berichten',
    value: 42,
  },
};

export const DesignNumberBadgeColor: Story = {
  name: 'Design: Number Badge Color',
  args: {
    children: '42',
    label: '42 ongelezen berichten',
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'number-badge': {
          'background-color': {
            $value: '',
          },
          'border-color': {
            $value: '',
          },
          color: {
            $value: '',
          },
        },
      },
    },
  },
};

export const DesignNumberBadgeBorder: Story = {
  name: 'Design: Number Badge Border',
  args: {
    children: '42',
    label: '42 ongelezen berichten',
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'number-badge': {
          'border-radius': {
            $value: '',
          },
          'border-width': {
            $value: '',
          },
        },
      },
    },
  },
};

export const DesignNumberBadgeSize: Story = {
  name: 'Design: Number Badge Size',
  args: {
    children: '42',
    label: '42 ongelezen berichten',
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'number-badge': {
          'min-inline-size': {
            $value: '',
          },
          'min-block-size': {
            $value: '',
          },
          'padding-inline': {
            $value: '',
          },
          'padding-block': {
            $value: '',
          },
        },
      },
    },
  },
};

export const DesignNumberBadgeTypography: Story = {
  name: 'Design: Number Badge Typography',
  args: {
    children: '42',
    label: '42 ongelezen berichten',
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'number-badge': {
          'font-size': {
            $value: '',
          },
          'font-family': {
            $value: '',
          },
          'font-weight': {
            $value: '',
          },
        },
      },
    },
  },
};
