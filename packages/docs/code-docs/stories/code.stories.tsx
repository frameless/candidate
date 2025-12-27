import type { StoryObj } from '@storybook/react-vite';
import type { CodeProps } from '@nl-design-system-candidate/code-react';

type Story = StoryObj<CodeProps>;

export const Code: Story = {
  name: 'Code',
  args: {
    children: `import { Code } from '@nl-design-system-candidate/code-react';`,
  },
};

export const DesignCodeTypography: Story = {
  name: 'Design: Code Typography',
  args: {
    children: `import { Code } from '@nl-design-system-candidate/code-react';`,
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        code: {
          'font-size': {
            $value: '',
          },
          'font-family': {
            $value: '',
          },
        },
      },
    },
  },
};

export const DesignCodeColor: Story = {
  name: 'Design: Code Color',
  args: {
    children: `import { Code } from '@nl-design-system-candidate/code-react';`,
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        code: {
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
