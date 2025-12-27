import type { StoryObj } from '@storybook/react-vite';
import { ColorSample } from '@nl-design-system-candidate/color-sample-react';
import type { ColorSampleProps } from '@nl-design-system-candidate/color-sample-react';

type Story = StoryObj<ColorSampleProps>;

export const DefaultColorSample: Story = {
  name: 'Color Sample',
  args: {
    value: 'deeppink',
  },
};

export const DesignColorSampleColor: Story = {
  name: 'Design: Color Sample Color',
  args: {
    value: 'deeppink',
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'color-sample': {
          'background-color': {
            $value: '0',
          },
        },
      },
    },
  },
};
export const DesignColorSampleSize: Story = {
  name: 'Design: Color Sample Size',
  args: {
    value: 'deeppink',
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'color-sample': {
          'block-size': {
            $value: '0',
          },
          'inline-size': {
            $value: '0',
          },
        },
      },
    },
  },
};

export const DesignColorSampleBorder: Story = {
  name: 'Design: Color Sample Border',
  args: {
    value: 'deeppink',
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        'color-sample': {
          'border-radius': {
            $value: '0',
          },
          'border-color': {
            $value: '0',
          },
          'border-width': {
            $value: '0',
          },
        },
      },
    },
    docs: {
      description: {
        story:
          'Gebruik een zichtbare border zodat het vakje met de Color Sample duidelijk, wanneer de kleur heel erg lijkt op de achtergrondkleur.',
      },
    },
  },
  render: ({ ...props }: ColorSampleProps) => (
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: '1ch' }}>
      {Array(11)
        .fill(0)
        .map((_, index) => index)
        .map((n) => (
          <ColorSample {...props} key={n} value={`hsl(0 0% ${100 - n * 10}%)`} />
        ))}
    </div>
  ),
};
