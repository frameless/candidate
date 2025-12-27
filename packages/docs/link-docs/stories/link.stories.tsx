import type { ComponentType } from 'react';
import type { StoryObj } from '@storybook/react-vite';
import type { LinkProps } from '@nl-design-system-candidate/link-react';
import { Link as LinkComponent } from '@nl-design-system-candidate/link-react';

type Story = StoryObj<LinkProps>;

export const Link: Story = {
  name: 'Link',
  args: {
    children: 'voorbeeldsite',
    href: 'https://example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Een standaard link',
      },
    },
  },
};

export const LinkInEenParagraph: Story = {
  name: 'Link in een Paragraph',
  args: {
    children: 'link in paragraaf',
    href: 'https://example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Een link in een paragraaf',
      },
    },
  },
  render(props, { component }) {
    const Link = component as ComponentType<LinkProps>;
    return (
      <>
        In deze paragraaf staat een <Link {...props}>link naar een voorbeeldsite</Link>.
      </>
    );
  },
};

export const DesignLinkDisabled: Story = {
  name: 'Design: Disabled Link',
  args: {
    children: 'voorbeeldsite',
    href: 'https://example.com',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: 'Een disabled link',
      },
    },
    tokens: {
      nl: {
        link: {
          disabled: {
            color: {
              $value: '',
            },
            cursor: {
              $value: '',
            },
          },
        },
      },
    },
  },
};

export const DesignLinkCurrent: Story = {
  name: 'Design: Current Link',
  args: {
    children: 'voorbeeldsite',
    href: 'https://example.com',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: 'Een current link',
      },
    },
    tokens: {
      nl: {
        link: {
          current: {
            cursor: {
              $value: '',
            },
          },
        },
      },
    },
  },
};

const RenderButtonStates = ({ ...props }: LinkProps) => (
  <>
    <LinkComponent {...props} />
    {' → hover → '}
    <LinkComponent {...props} className="nl-link--hover" />
    {' → active → '}
    <LinkComponent {...props} className="nl-link--active" />
  </>
);

export const DesignLinkStates: Story = {
  name: 'Design: Link States',
  args: {
    children: 'example.com',
    href: 'https://example.com/',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    tokens: {
      nl: {
        link: {
          color: {
            $value: '0',
          },
          'text-decoration-line': {
            $value: '0',
          },
          'text-decoration-thickness': {
            $value: '0',
          },
          'text-decoration-color': {
            $value: '0',
          },
          'text-underline-offset': {
            $value: '0',
          },
          hover: {
            color: {
              $value: '0',
            },
            'text-decoration-line': {
              $value: '0',
            },
            'text-decoration-thickness': {
              $value: '0',
            },
          },
          active: {
            color: {
              $value: '0',
            },
          },
        },
      },
    },
  },
};
