import type { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button as ButtonComponent, type ButtonProps } from '@nl-design-system-candidate/button-react';

const _meta = { component: ButtonComponent } satisfies Meta<typeof ButtonComponent>;

type Story = StoryObj<typeof _meta>;

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1" />
    <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
  </svg>
);

export const Button: Story = {
  name: 'Design: Button',
  args: {
    label: 'Klik mij!',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een standaard Button`,
      },
    },
    tokens: {
      nl: {
        button: {
          default: {
            'border-width': {
              $value: '',
            },
            'font-size': {
              $value: '',
            },
            'font-weight': {
              $value: '',
            },
            'line-height': {
              $value: '',
            },
          },
        },
      },
    },
  },
};

const ButtonVariants = ({ ...props }: ButtonProps) => (
  // TODO: Replace with Action Group
  <div style={{ display: 'flex', flexDirection: 'row', columnGap: '1ch' }}>
    <ButtonComponent {...props} iconOnly />
    <ButtonComponent {...props} />
    <ButtonComponent {...props} purpose="primary" iconOnly />
    <ButtonComponent {...props} purpose="primary" />
    <ButtonComponent {...props} purpose="secondary" iconOnly />
    <ButtonComponent {...props} purpose="secondary" />
    <ButtonComponent {...props} purpose="subtle" iconOnly />
    <ButtonComponent {...props} purpose="subtle" />
  </div>
);

export const ButtonBorders: Story = {
  name: 'Design: Button Borders',
  args: {
    label: 'Klik mij!',
    iconStart: '❤️',
  },
  render: ButtonVariants,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Er is 1 instelling voor de border-radius van alle soorten buttons.`,
      },
    },
    tokens: {
      nl: {
        button: {
          'border-radius': {
            $value: '',
          },
          default: {
            'border-width': {
              $value: '',
            },
          },
          primary: {
            'border-width': {
              $value: '',
            },
          },
          secondary: {
            'border-width': {
              $value: '',
            },
          },
          subtle: {
            'border-width': {
              $value: '',
            },
          },
        },
      },
    },
  },
};

export const ButtonTypography: Story = {
  name: 'Design: Button Typography',
  args: {
    label: 'Klik mij!',
    iconStart: '❤️',
  },
  render: ButtonVariants,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Buttons op 'n rijtje.`,
      },
    },
    tokens: {
      nl: {
        button: {
          'font-family': {
            $value: '',
          },
          default: {
            'font-size': {
              $value: '',
            },
            'font-weight': {
              $value: '',
            },
            'line-height': {
              $value: '',
            },
          },
          primary: {
            'font-size': {
              $value: '',
            },
            'font-weight': {
              $value: '',
            },
            'line-height': {
              $value: '',
            },
          },
          secondary: {
            'font-size': {
              $value: '',
            },
            'font-weight': {
              $value: '',
            },
            'line-height': {
              $value: '',
            },
          },
          subtle: {
            'font-size': {
              $value: '',
            },
            'font-weight': {
              $value: '',
            },
            'line-height': {
              $value: '',
            },
          },
        },
      },
    },
  },
};

const RenderButtonStates = ({ ...props }: ButtonProps) => (
  <>
    <ButtonComponent {...props} />
    {' → hover → '}
    <ButtonComponent {...props} className="nl-button--hover" />
    {' → active → '}
    <ButtonComponent {...props} className="nl-button--active" />
  </>
);

export const ButtonStates: Story = {
  name: 'Design: Button States',
  args: {
    label: 'Klik mij!',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een standaard Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          default: {
            'background-color': {
              $value: '',
            },
            'border-color': {
              $value: '',
            },
            color: {
              $value: '',
            },
            active: {
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
            hover: {
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
    },
  },
};

export const PrimaryButtonStates: Story = {
  name: 'Design: Button States',
  args: {
    label: 'Klik mij!',
    purpose: 'primary',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een Primary Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          primary: {
            'background-color': {
              $value: '',
            },
            'border-color': {
              $value: '',
            },
            color: {
              $value: '',
            },
            active: {
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
            hover: {
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
    },
  },
};

export const SecondaryButtonStates: Story = {
  name: 'Design: Secondary Button States',
  args: {
    label: 'Klik mij!',
    purpose: 'secondary',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een Secondary Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          secondary: {
            'background-color': {
              $value: '',
            },
            'border-color': {
              $value: '',
            },
            color: {
              $value: '',
            },
            active: {
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
            hover: {
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
    },
  },
};

export const SubtleButtonStates: Story = {
  name: 'Design: Subtle Button States',
  args: {
    label: 'Klik mij!',
    purpose: 'subtle',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een Subtle Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          subtle: {
            'background-color': {
              $value: '',
            },
            'border-color': {
              $value: '',
            },
            color: {
              $value: '',
            },
            active: {
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
            hover: {
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
    },
  },
};

export const PrimaryPositiveButtonStates: Story = {
  name: 'Design: Primary Positive Button States',
  args: {
    label: 'Klik mij!',
    purpose: 'primary',
    hint: 'positive',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een Primary Positive Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          primary: {
            positive: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};
export const SecondaryPositiveButtonStates: Story = {
  name: 'Design: Secondary Positive Button States',
  args: {
    label: 'Klik mij!',
    purpose: 'secondary',
    hint: 'positive',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een Secondary Positive Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          secondary: {
            positive: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};
export const SubtlePositiveButtonStates: Story = {
  name: 'Design: Subtle Positive Button States',
  args: {
    label: 'Klik mij!',
    purpose: 'subtle',
    hint: 'positive',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een Subtle Positive Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          subtle: {
            positive: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};

export const PrimaryNegativeButtonStates: Story = {
  name: 'Design: Primary Negative Button States',
  args: {
    label: 'Klik mij!',
    purpose: 'primary',
    hint: 'negative',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een Primary Negative Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          primary: {
            negative: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};
export const SecondaryNegativeButtonStates: Story = {
  name: 'Design: Secondary Negative Button States',
  args: {
    label: 'Klik mij!',
    purpose: 'secondary',
    hint: 'negative',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een Secondary Negative Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          secondary: {
            negative: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};
export const SubtleNegativeButtonStates: Story = {
  name: 'Design: Subtle Negative Button States',
  args: {
    label: 'Klik mij!',
    purpose: 'subtle',
    hint: 'negative',
  },
  render: RenderButtonStates,
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een Subtle Negative Button, met hover en active states.`,
      },
    },
    tokens: {
      nl: {
        button: {
          subtle: {
            negative: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};

export const PrimaryButton: Story = {
  name: 'Design: Primary Button',
  args: {
    label: 'Primary Button',
    purpose: 'primary',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Button die een primaire actie aanduid. Een primaire actie is de meest logische keuze in een flow.
Wees spaarzaam met een primary button. Te veel primary buttons in beeld kan verwarrend zijn voor de gebruiker.
Optioneel kan er een hint mee gegeven worden.

- \`hint="positive"\` geeft een positief of successvol resultaat aan. Bijvoorbeeld een creatie actie.
- \`hint="negative"\` geeft een negatief of destructief resultaat aan. Bijvoorbeeld een verwijder actie.
        `,
      },
    },
    tokens: {
      nl: {
        button: {
          primary: {
            'border-width': {
              $value: '',
            },
            'font-size': {
              $value: '',
            },
            'font-weight': {
              $value: '',
            },
            'line-height': {
              $value: '',
            },
          },
        },
      },
    },
  },
  render({ label, children: _children, ...props }, { component }) {
    const Button = component as ComponentType<ButtonProps>;

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button {...props} label={label} purpose="primary" />
        <Button {...props} label={`${label} (positive)`} purpose="primary" hint="positive" />
        <Button {...props} label={`${label} (negative)`} purpose="primary" hint="negative" />
      </div>
    );
  },
};

export const SecondaryButton: Story = {
  name: 'Design: Secondary Button',
  args: {
    label: 'Secondary Button',
    purpose: 'secondary',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Button die een secondare actie aanduid. De secondaire actie wordt gebruikt als alternatief voor de primaire actie.
Optioneel kan er een hint mee gegeven worden.

- \`hint="positive"\` geeft een positief of successvol resultaat aan. Bijvoorbeeld een creatie actie.
- \`hint="negative"\` geeft een negatief of destructief resultaat aan. Bijvoorbeeld een verwijder actie.
        `,
      },
    },
    tokens: {
      nl: {
        button: {
          secondary: {
            'border-width': {
              $value: '',
            },
            'font-size': {
              $value: '',
            },
            'font-weight': {
              $value: '',
            },
            'line-height': {
              $value: '',
            },
          },
        },
      },
    },
  },
  render: ({ label, children: _children, ...props }, { component }) => {
    const Button = component as ComponentType<ButtonProps>;

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button {...props} label={label} purpose="secondary" />
        <Button {...props} label={`${label} (positive)`} purpose="secondary" hint="positive" />
        <Button {...props} label={`${label} (negative)`} purpose="secondary" hint="negative" />
      </div>
    );
  },
};

export const SubtleButton: Story = {
  name: 'Design: Subtle Button',
  args: {
    label: 'Subtle Button',
    purpose: 'subtle',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een subtle button is een button die niet meteen de aandacht trekt.
Optioneel kan er een hint mee gegeven worden.

- \`hint="positive"\` geeft een positief of successvol resultaat aan. Bijvoorbeeld een creatie actie.
- \`hint="negative"\` geeft een negatief of destructief resultaat aan. Bijvoorbeeld een verwijder actie.
        `,
      },
    },
    tokens: {
      nl: {
        button: {
          subtle: {
            'border-width': {
              $value: '',
            },
            'font-size': {
              $value: '',
            },
            'font-weight': {
              $value: '',
            },
            'line-height': {
              $value: '',
            },
          },
        },
      },
    },
  },
  render: ({ label, children: _children, ...props }, { component }) => {
    const Button = component as ComponentType<ButtonProps>;

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button {...props} label={label} purpose="subtle" />
        <Button {...props} label={`${label} (positive)`} purpose="subtle" hint="positive" />
        <Button {...props} label={`${label} (negative)`} purpose="subtle" hint="negative" />
      </div>
    );
  },
};

export const FocusButton: Story = {
  name: 'Design: Focus Button',
  args: {
    label: 'Klik mij!',
    className: 'nl-button--focus-visible',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `...`,
      },
    },
    tokens: {
      nl: {
        button: {
          'outline-offset': {
            $value: '',
          },
          focus: {
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
  },
};

export const DisabledButton: Story = {
  name: 'Design: Disabled Button',
  args: {
    label: 'Klik mij!',
    disabled: true,
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een button die (tijdelijk) niet bruikbaar is. Hoewel dit patroon vaak gebruikt wordt, kan het verwarrend zijn voor gebruikers.

Om de button focusbaar te houden voor screenreaders, wordt er \`aria-disabled="true"\` op de button geplaatst om aan te geven dat deze disabled is.
Dat betekend dat de \`onClick\` handlers blijven werken, en dat de developer verantwoordelijk is om een melding te geven waarom de button disabled is.
De styling komt van de \`.nl-button--disabled\` class.
`,
      },
    },
    tokens: {
      nl: {
        button: {
          default: {
            disabled: {
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
    },
  },
};

export const PrimaryDisabledButton: Story = {
  name: 'Design: Primary Disabled Button',
  args: {
    label: 'Ingedrukt',
    disabled: true,
    purpose: 'primary',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een ingedrukte Primary Button.`,
      },
    },

    tokens: {
      nl: {
        button: {
          primary: {
            disabled: {
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
    },
  },
};

export const SecondaryDisabledButton: Story = {
  name: 'Design: Secondary Disabled Button',
  args: {
    label: 'Ingedrukt',
    disabled: true,
    purpose: 'secondary',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een ingedrukte Secondary Button`,
      },
    },

    tokens: {
      nl: {
        button: {
          secondary: {
            disabled: {
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
    },
  },
};

export const SubtleDisabledButton: Story = {
  name: 'Design: Subtle Disabled Button',
  args: {
    label: 'Ingedrukt',
    disabled: true,
    purpose: 'subtle',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een ingedrukte Subtle Button.`,
      },
    },

    tokens: {
      nl: {
        button: {
          subtle: {
            disabled: {
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
    },
  },
};

export const AlleenEenIcon: Story = {
  name: 'Design: Alleen een icon',
  argTypes: {
    iconStart: {
      table: {
        disable: false,
      },
    },
  },
  args: {
    iconOnly: true,
    iconStart: <Icon />,
    label: 'Klik mij!',
  },
  parameters: {
    designStory: true,
    docs: {
      description: {
        story: `Een button met alleen een icon. Het label is niet zichtbaar, maar wel aanwezig voor toegankelijkheid.`,
      },
    },
    tokens: {
      nl: {
        button: {
          'icon-only': {
            'padding-block-end': {
              $value: '',
            },
            'padding-block-start': {
              $value: '',
            },
            'padding-inline-end': {
              $value: '',
            },
            'padding-inline-start': {
              $value: '',
            },
          },
        },
      },
    },
  },
};

export const IconVoorHetLabel: Story = {
  name: 'Icon voor het label',
  argTypes: {
    iconStart: {
      table: {
        disable: false,
      },
    },
  },
  args: {
    iconStart: <Icon />,
    label: 'Klik mij!',
  },
  parameters: {
    docs: {
      description: {
        story: `Een button met een icon voor het label`,
      },
    },
    tokens: {
      nl: {
        button: {
          'column-gap': {
            $value: '',
          },
          icon: {
            size: {
              $value: '',
            },
          },
        },
      },
    },
  },
};

export const IconAchterHetLabel: Story = {
  name: 'Icon achter het label',
  argTypes: {
    iconEnd: {
      table: {
        disable: false,
      },
    },
  },
  args: {
    iconEnd: <Icon />,
    label: 'Klik mij!',
  },
  parameters: {
    docs: {
      description: {
        story: `Een button met een icon achter het label`,
      },
    },
    tokens: {
      nl: {
        button: {
          'column-gap': {
            $value: '',
          },
          icon: {
            size: {
              $value: '',
            },
          },
        },
      },
    },
  },
};

export const GeformatteerdLabel: Story = {
  name: 'Geformatteerd label',
  argTypes: {
    label: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Het label van de button bevat HTML elementen',
      },
    },
  },
  args: {
    label: (
      <>
        Dit is een <em>button</em> met een <u>geformatteerd</u> label
      </>
    ),
  },
};

export const GeformatteerdLabelEnEenIcon: Story = {
  name: 'Geformatteerd label en een Icon',
  argTypes: {
    label: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Het label van de button bevat HTML elementen én een icon. De inhoud van de button wordt geplaatst in een element om gaten tussen de HTML elementen te voorkomen',
      },
    },
  },
  args: {
    label: (
      <>
        Met icon en <u>geformatteerd</u> label
      </>
    ),
    iconStart: <Icon />,
  },
};

export const PressedButton: Story = {
  name: 'Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          default: {
            pressed: {
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
    },
  },
};

export const PrimaryPressedButton: Story = {
  name: 'Primary Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    purpose: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte Primary Button.`,
      },
    },

    tokens: {
      nl: {
        button: {
          primary: {
            pressed: {
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
    },
  },
};

export const SecondaryPressedButton: Story = {
  name: 'Secondary Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    purpose: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte Secondary Button`,
      },
    },

    tokens: {
      nl: {
        button: {
          secondary: {
            pressed: {
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
    },
  },
};

export const SubtlePressedButton: Story = {
  name: 'Subtle Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    purpose: 'subtle',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte Subtle Button.`,
      },
    },

    tokens: {
      nl: {
        button: {
          subtle: {
            pressed: {
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
    },
  },
};

export const PrimaryPositiveButton: Story = {
  name: 'Primary Positive Button',
  args: {
    label: 'Ingedrukt',
    purpose: 'primary',
    hint: 'positive',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte positieve Primary Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          primary: {
            positive: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};

export const PrimaryNegativeButton: Story = {
  name: 'Primary Negative Button',
  args: {
    label: 'Ingedrukt',
    purpose: 'primary',
    hint: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte negative Primary Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          primary: {
            negative: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};

export const SecondaryPositiveButton: Story = {
  name: 'Secondary Positive Button',
  args: {
    label: 'Ingedrukt',
    purpose: 'secondary',
    hint: 'positive',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte positieve Secondary Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          secondary: {
            positive: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};

export const SecondaryNegativeButton: Story = {
  name: 'Secondary Negative Button',
  args: {
    label: 'Ingedrukt',
    purpose: 'secondary',
    hint: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte negative Secondary Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          secondary: {
            negative: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};

export const SubtlePositiveButton: Story = {
  name: 'Subtle Positive Button',
  args: {
    label: 'Ingedrukt',
    purpose: 'subtle',
    hint: 'positive',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte positieve Subtle Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          subtle: {
            positive: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};

export const SubtleNegativeButton: Story = {
  name: 'Subtle Negative Button',
  args: {
    label: 'Ingedrukt',
    purpose: 'subtle',
    hint: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte negative Subtle Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          subtle: {
            negative: {
              'background-color': {
                $value: '',
              },
              'border-color': {
                $value: '',
              },
              color: {
                $value: '',
              },
              active: {
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
              hover: {
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
      },
    },
  },
};

export const PrimaryPositivePressedButton: Story = {
  name: 'Primary Positive Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    purpose: 'primary',
    hint: 'positive',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte positieve Primary Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          primary: {
            positive: {
              pressed: {
                'background-color': {
                  $value: '',
                },
                'border-color': {
                  $value: '',
                },
                color: {
                  $value: '',
                },
                active: {
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
                hover: {
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
        },
      },
    },
  },
};

export const PrimaryNegativePressedButton: Story = {
  name: 'Primary Negative Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    purpose: 'primary',
    hint: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte negative Primary Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          primary: {
            negative: {
              pressed: {
                'background-color': {
                  $value: '',
                },
                'border-color': {
                  $value: '',
                },
                color: {
                  $value: '',
                },
                active: {
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
                hover: {
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
        },
      },
    },
  },
};

export const SecondaryPositivePressedButton: Story = {
  name: 'Secondary Positive Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    purpose: 'secondary',
    hint: 'positive',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte positieve Secondary Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          secondary: {
            positive: {
              pressed: {
                'background-color': {
                  $value: '',
                },
                'border-color': {
                  $value: '',
                },
                color: {
                  $value: '',
                },
                active: {
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
                hover: {
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
        },
      },
    },
  },
};

export const SecondaryNegativePressedButton: Story = {
  name: 'Secondary Negative Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    purpose: 'secondary',
    hint: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte negative Secondary Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          secondary: {
            negative: {
              pressed: {
                'background-color': {
                  $value: '',
                },
                'border-color': {
                  $value: '',
                },
                color: {
                  $value: '',
                },
                active: {
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
                hover: {
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
        },
      },
    },
  },
};

export const SubtlePositivePressedButton: Story = {
  name: 'Subtle Positive Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    purpose: 'subtle',
    hint: 'positive',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte positieve Subtle Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          subtle: {
            positive: {
              pressed: {
                'background-color': {
                  $value: '',
                },
                'border-color': {
                  $value: '',
                },
                color: {
                  $value: '',
                },
                active: {
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
                hover: {
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
        },
      },
    },
  },
};

export const SubtleNegativePressedButton: Story = {
  name: 'Subtle Negative Pressed Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    purpose: 'subtle',
    hint: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte negative Subtle Button.`,
      },
    },
    tokens: {
      nl: {
        button: {
          subtle: {
            negative: {
              pressed: {
                'background-color': {
                  $value: '',
                },
                'border-color': {
                  $value: '',
                },
                color: {
                  $value: '',
                },
                active: {
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
                hover: {
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
        },
      },
    },
  },
};

export const VolleBreedte: Story = {
  name: 'Volle breedte',
  args: {
    label: 'Ik ben een button met een hele lange tekst',
    iconStart: <Icon />,
  },
  parameters: {
    parameters: {
      docs: {
        description: {
          story: 'Het label van de button bevat HTML elementen',
        },
      },
    },

    docs: {
      description: {
        story: `De parent van een button kan de breedte van de button bepalen. De button schaalt mee met de beschikbare ruimte.`,
      },
    },
  },
  render: (props, { component }) => {
    const Button = component as ComponentType<ButtonProps>;

    return (
      <>
        <div style={{ display: 'flex', resize: 'both', overflow: 'auto' }}>
          <Button style={{ flex: 1 }} {...props} />
        </div>
        <br />
        <div style={{ display: 'flex', resize: 'both', overflow: 'auto', width: '300px' }}>
          <Button style={{ flex: 1 }} {...props} />
        </div>
      </>
    );
  },
};

export const ButtonSize: Story = {
  name: 'Design: Button Size',
  args: {
    label: 'Voorbeeld',
  },
  parameters: {
    docs: {
      description: {
        story: `..`,
      },
    },
    tokens: {
      nl: {
        button: {
          'default.line-height': { $value: '' },
          'min-block-size': { $value: '' },
          'min-inline-size': { $value: '' },
          'padding-block-end': { $value: '' },
          'padding-block-start': { $value: '' },
          'padding-inline-end': { $value: '' },
          'padding-inline-start': { $value: '' },
        },
      },
    },
  },
};

export const HTMLButton: Story = {
  name: 'HTML Button',
  args: {
    label: 'Klik mij!',
  },
  parameters: {
    docs: {
      description: {
        story: 'Een `<button>` element gestyled als een Button',
      },
    },
  },
  render: (args: ButtonProps) => {
    const { label, children, ...rest } = args;
    return <button {...rest}>{children || label}</button>;
  },
};

/*
export const HTMLInputButton: Story = {
  name: 'HTML Input Button',
  args: {
    label: 'Klik mij!',
    children: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Een `<input>` element gestyled als een Button',
      },
    },
  },
  render: (args: ButtonProps) => {
    const { label, ...rest } = args;
    return <input type="button" {...rest} value={label} />;
  },
};
*/
