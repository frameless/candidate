import type { StoryObj } from '@storybook/react-vite';
import type { SkipLinkProps } from '@nl-design-system-candidate/skip-link-react';

type Story = StoryObj<SkipLinkProps>;

export const SkipLink: Story = {
  name: 'Skip Link',
  args: {
    children: 'Naar de inhoud',
    href: '#inhoud',
  },
};

export const SkipLinkTypography: Story = {
  name: 'Design: Skip Link Typography',
  args: {
    children: 'Naar de inhoud',
    href: '#inhoud',
    className: 'nl-skip-link--visible',
    style: {
      position: 'static',
    },
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'skip-link': {
          'font-size': {
            $value: '',
          },
          'line-height': {
            $value: '',
          },
          'text-decoration-thickness': {
            $value: '',
          },
          'text-underline-offset': {
            $value: '',
          },
        },
      },
    },
  },
};

export const SkipLinkSize: Story = {
  name: 'Design: Skip Link Size',
  args: {
    children: 'Naar de inhoud',
    href: '#inhoud',
    className: 'nl-skip-link--visible',
    style: {
      position: 'static',
    },
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'skip-link': {
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

export const SkipLinkFocus: Story = {
  name: 'Design: Skip Link Focus',
  args: {
    children: 'Naar de inhoud',
    href: '#inhoud',
    className: 'nl-skip-link--visible',
    style: {
      position: 'static',
    },
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'skip-link': {
          'background-color': {
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
