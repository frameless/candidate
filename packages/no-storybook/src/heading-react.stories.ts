import type { Meta, StoryObj } from '@storybook/react-vite';
// import packageJSON from '../../components-react/heading-react/package.json';
import { Heading as HeadingComponent } from '@nl-design-system-candidate/heading-react';
import headingMeta from '@nl-design-system-candidate/heading-docs/stories/heading.react.meta';
import * as Stories from '@nl-design-system-candidate/heading-docs/stories/heading.stories';
// import { getExternalLinks } from '../src/helpers/external-links';
import tokens from '@nl-design-system-candidate/heading-tokens';

// const externalLinks = getExternalLinks('https://nldesignsystem.nl/heading', packageJSON.homepage);

const meta = {
  ...headingMeta,
  // ...externalLinks,
  title: 'React Componenten/Heading',
  id: 'heading',
  parameters: { tokens },
} satisfies Meta<typeof HeadingComponent>;

export default meta;

// export const Heading1MetMeerdereRegelsTekst = Stories.Heading1MetMeerdereRegelsTekst;

export const DesignHeadingSizes = Stories.DesignHeadingSizes;

type Story = StoryObj<typeof meta>;

export const DesignHeading1: Story = {
  name: 'Design: Heading 1',
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    level: 1,
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        heading: {
          'level-1': {
            'font-family': { $value: '' },
            'font-size': { $value: '' },
            'font-weight': { $value: '' },
            'line-height': { $value: '' },
            'margin-block-end': { $value: '' },
            'margin-block-start': { $value: '' },
            color: { $value: '' },
          },
        },
      },
    },
  },
};

export const DesignHeading2: Story = {
  name: 'Design: Heading 2',
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    level: 2,
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        heading: {
          'level-2': {
            'font-family': { $value: '' },
            'font-size': { $value: '' },
            'font-weight': { $value: '' },
            'line-height': { $value: '' },
            'margin-block-end': { $value: '' },
            'margin-block-start': { $value: '' },
            color: { $value: '' },
          },
        },
      },
    },
  },
};

export const DesignHeading3: Story = {
  name: 'Design: Heading 3',
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    level: 3,
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        heading: {
          'level-3': {
            'font-family': { $value: '' },
            'font-size': { $value: '' },
            'font-weight': { $value: '' },
            'line-height': { $value: '' },
            'margin-block-end': { $value: '' },
            'margin-block-start': { $value: '' },
            color: { $value: '' },
          },
        },
      },
    },
  },
};

export const DesignHeading4: Story = {
  name: 'Design: Heading 4',
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    level: 4,
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        heading: {
          'level-4': {
            'font-family': { $value: '' },
            'font-size': { $value: '' },
            'font-weight': { $value: '' },
            'line-height': { $value: '' },
            'margin-block-end': { $value: '' },
            'margin-block-start': { $value: '' },
            color: { $value: '' },
          },
        },
      },
    },
  },
};

export const DesignHeading5: Story = {
  name: 'Design: Heading 5',
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    level: 5,
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        heading: {
          'level-5': {
            'font-family': { $value: '' },
            'font-size': { $value: '' },
            'font-weight': { $value: '' },
            'line-height': { $value: '' },
            'margin-block-end': { $value: '' },
            'margin-block-start': { $value: '' },
            color: { $value: '' },
          },
        },
      },
    },
  },
};

export const DesignHeading6: Story = {
  name: 'Design: Heading 6',
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    level: 6,
  },
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        heading: {
          'level-6': {
            'font-family': { $value: '' },
            'font-size': { $value: '' },
            'font-weight': { $value: '' },
            'line-height': { $value: '' },
            'margin-block-end': { $value: '' },
            'margin-block-start': { $value: '' },
            color: { $value: '' },
          },
        },
      },
    },
  },
};
