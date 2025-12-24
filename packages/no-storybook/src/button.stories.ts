import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PropsWithChildren } from 'react';
import type { ButtonProps } from '@nl-design-system-candidate/button-react';

const Component = ({ label, children }: PropsWithChildren<ButtonProps & { restProps?: never }>) => [
  'Button: ',
  label,
  children,
];

const meta = {
  component: Component,
  title: 'React Component/Button',
  parameters: {
    docs: {
      description: {
        component: 'Als de `purpose` prop is gezet, kan er optioneel een `hint` mee gegeven worden',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'De content van de button',
      table: { category: 'Props' },
    },
    purpose: {
      control: 'select',
      description: 'Een optioneel doel van de button. Te veel primary buttons kunnen verwarrend zijn',
      options: [undefined, 'primary', 'secondary', 'subtle'],
      table: {
        category: 'Props',
        type: { summary: `'primary' | 'secondary' | 'subtle'` },
      },
    },
    hint: {
      control: 'select',
      description: `Een optionele hint van het resultaat van de button. Deze property werkt alleen als de \`purpose\` prop ook is gezet.

- \`positive\` hint op de bevestiging van iets
- \`positive\` hint op de verwijdering van iets
`,
      options: [undefined, 'positive', 'negative'],
      table: {
        category: 'Props',
        type: { summary: `'positive' | 'negative'` },
      },
    },
    disabled: {
      control: 'boolean',
      description: `Geeft aan dat de button disabled is. Een disabled button is zichtbaar, maar kan niet gebruikt worden. Het kan dus verwarrend zijn voor een gebruiker.

  \`aria-disabled="true"\` wordt hiervoor gebruikt. Op die manier kan de gebruikter de button nog steeds met een toetsenbord bereiken en erachter komen dat de button disabled is.

  De developer is echter wel verantwoordelijk voor het afhandelen van click events die nog steeds zullen werken!`,
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    htmlDisabled: {
      control: false,
      description: `Als het absoluut noodzakelijk is om de html \`disabled\` attribute te gebruiken, dan kan dat met \`htmlDisabled\`. Bedenk dat dit voor toegankelijkheid problemen zorgt omdat de button helemaal niet meer met het toetsenbord te bereiken is en dus ook onzichtbaar is voor hulpsoftware`,
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    pressed: {
      control: 'boolean',
      description:
        'Geeft aan dat de button is ingedrukt, ook als de gebruiker op dit moment niet met de button interacteert',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Laat alleen icons zien, verberg de tekst.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    iconStart: {
      control: false,
      description: 'Een icon voor de content van de button',
      table: { category: 'Props', type: { summary: 'ReactNode' } },
    },
    iconEnd: {
      control: false,
      description: 'Een icon achter de content van de button',
      table: { category: 'Props', type: { summary: 'ReactNode' } },
    },
    toggle: {
      control: 'boolean',
      description:
        'Voor hulpsoftware wordt de button aangekondigd als Toggle Button, ook wanneer de button nog niet ingedrukt is.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
      },
    },
    restProps: {
      name: '{...restProps}',
      control: false,
      description:
        'Alle props en attributes die hier niet bschreven zijn worden direct op het `<button>` element geplaatst. Dat betekend dat alle attributes van een html button als prop geplaatst kunnen worden',
      table: {
        category: 'Props',
        type: {
          summary: 'Examples',
          detail: 'command="show-dialog"\ncommandFor="dialog-id"\n\'aria-labelledby\'="label-id"',
        },
      },
    },
    children: {
      control: false,
      description: 'De content van de button',
      table: {
        category: 'API',
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Component>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Button: Story = {
  name: 'Button',
  args: {
    label: 'Klik mij!',
  },
  parameters: {
    docs: {
      description: {
        story: `Een standaard Button`,
      },
    },
  },
};

export const PrimaryButton: Story = {
  name: 'Primary Button',
  args: {
    label: 'Primary Button',
    purpose: 'primary',
  },
  parameters: {
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
  },
  /*
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
  */
};

export const SecondaryButton: Story = {
  name: 'Secondary Button',
  args: {
    label: 'Secondary Button',
    purpose: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: `Button die een secondare actie aanduid. De secondaire actie wordt gebruikt als alternatief voor de primaire actie.
Optioneel kan er een hint mee gegeven worden.

- \`hint="positive"\` geeft een positief of successvol resultaat aan. Bijvoorbeeld een creatie actie.
- \`hint="negative"\` geeft een negatief of destructief resultaat aan. Bijvoorbeeld een verwijder actie.
        `,
      },
    },
  },
  /*
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
  */
};

export const SubtleButton: Story = {
  name: 'Subtle Button',
  args: {
    label: 'Subtle Button',
    purpose: 'subtle',
  },
  parameters: {
    docs: {
      description: {
        story: `Een subtle button is een button die niet meteen de aandacht trekt.
Optioneel kan er een hint mee gegeven worden.

- \`hint="positive"\` geeft een positief of successvol resultaat aan. Bijvoorbeeld een creatie actie.
- \`hint="negative"\` geeft een negatief of destructief resultaat aan. Bijvoorbeeld een verwijder actie.
        `,
      },
    },
  },
  /*
  render: ({ label, children: _children, ...props }, { component }) => {
    const Button = component as ComponentType<ButtonProps>;

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button {...props} label={label} purpose="subtle" />
        <Button {...props} label={`${label} (positive)`} purpose="subtle" hint="positive" />
        <Button {...props} label={`${label} (negative)`} purpose="subtle" hint="negative" />
      </div>
    );
  },*/
};

export const DisabledButton: Story = {
  name: 'Disabled Button',
  args: {
    label: 'Klik mij!',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: `Een button die (tijdelijk) niet bruikbaar is. Hoewel dit patroon vaak gebruikt wordt, kan het verwarrend zijn voor gebruikers.

Om de button focusbaar te houden voor screenreaders, wordt er \`aria-disabled="true"\` op de button geplaatst om aan te geven dat deze disabled is.
Dat betekend dat de \`onClick\` handlers blijven werken, en dat de developer verantwoordelijk is om een melding te geven waarom de button disabled is.
De styling komt van de \`.nl-button--disabled\` class.
`,
      },
    },
  },
};

export const AlleenEenIcon: Story = {
  name: 'Alleen een icon',
  argTypes: {
    iconStart: {
      table: {
        disable: false,
      },
    },
  },
  args: {
    iconOnly: true,
    /*iconStart: <Icon />,*/
    label: 'Klik mij!',
  },
  parameters: {
    docs: {
      description: {
        story: `Een button met alleen een icon. Het label is niet zichtbaar, maar wel aanwezig voor toegankelijkheid.`,
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
    /*iconStart: <Icon />,*/
    label: 'Klik mij!',
  },
  parameters: {
    docs: {
      description: {
        story: `Een button met een icon voor het label`,
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
    /*iconEnd: <Icon />,*/
    label: 'Klik mij!',
  },
  parameters: {
    docs: {
      description: {
        story: `Een button met een icon achter het label`,
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
    /*label: (
      <>
        Dit is een <em>button</em> met een <u>geformatteerd</u> label
      </>
    ),*/
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
    /*
    label: (
      <>
        Met icon en <u>geformatteerd</u> label
      </>
    ),
    iconStart: <Icon />,
    */
  },
};

export const ToggleButton: Story = {
  name: 'Toggle Button',
  args: {
    label: 'Ingedrukt',
    pressed: true,
    toggle: true,
  },
  parameters: {
    docs: {
      description: {
        story: `Een ingedrukte button. De styling komt van de \`.nl-button--pressed\` class, de semantische role via \`aria-pressed="true"\`.`,
      },
    },
  },
};

export const VolleBreedte: Story = {
  // name: 'Volle breedte',
  args: {
    label: 'Ik ben een button met een hele lange tekst',
    /*iconStart: <Icon />,*/
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
  /*
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
  */
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
  /*
  render: (args: ButtonProps) => {
    const { label, children, ...rest } = args;
    return <button {...rest}>{children || label}</button>;
  },
  */
};
