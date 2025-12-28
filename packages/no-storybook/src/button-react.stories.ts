import type { Meta } from '@storybook/react-vite';
import { merge } from 'lodash-es';
// import packageJSON from '../../components-react/button-react/package.json';
import { type ButtonProps } from '@nl-design-system-candidate/button-react';
import buttonMeta from '@nl-design-system-candidate/button-docs/stories/button.react.meta';
import * as Stories from '@nl-design-system-candidate/button-docs/stories/button.stories';
import '../../components-css/button-css/src/test.scss';
// import { useArgs } from 'storybook/preview-api';
// import { getExternalLinks } from '../src/helpers/external-links';
import description from '@nl-design-system-candidate/button-docs/docs/description.md?raw';
import tokens from '@nl-design-system-candidate/button-tokens';
// const externalLinks = getExternalLinks('https://nldesignsystem.nl/button', packageJSON.homepage);

const meta = {
  ...merge(
    buttonMeta,
    /* externalLinks,*/ {
      parameters: {
        docs: {
          subtitle: description,
        },
        tokens,
      },
    },
  ),
  title: 'React Componenten/Button',
  id: 'button',
} satisfies Meta<ButtonProps>;

export default meta;

export const Button = Stories.Button;
export const DesignButton = Stories.DesignButton;

export const PrimaryButton = Stories.PrimaryButton;
export const SecondaryButton = Stories.SecondaryButton;
export const SubtleButton = Stories.SubtleButton;

export const FocusButton = Stories.DesignFocusButton;
export const ButtonTypography = Stories.DesignButtonTypography;
export const ButtonBorders = Stories.DesignButtonBorders;
export const DesignButtonSize = Stories.DesignButtonSize;

export const DisabledButton = Stories.DisabledButton;
export const PressedButton = Stories.PressedButton;
export const DesignPressedButton = Stories.DesignPressedButton;
export const DesignPrimaryPressedButton = Stories.DesignPrimaryPressedButton;
export const DesignSecondaryPressedButton = Stories.DesignSecondaryPressedButton;
export const DesignSubtlePressedButton = Stories.DesignSubtlePressedButton;

export const DesignPrimaryPositiveButton = Stories.DesignPrimaryPositiveButton;
export const DesignSecondaryPositiveButton = Stories.DesignSecondaryPositiveButton;
export const DesignSubtlePositiveButton = Stories.DesignSubtlePositiveButton;

export const DesignPrimaryNegativeButton = Stories.DesignPrimaryNegativeButton;
export const DesignSecondaryNegativeButton = Stories.DesignSecondaryNegativeButton;
export const DesignSubtleNegativeButton = Stories.DesignSubtleNegativeButton;

export const DesignPrimaryPositivePressedButton = Stories.DesignPrimaryPositivePressedButton;
export const DesignSecondaryPositivePressedButton = Stories.DesignSecondaryPositivePressedButton;
export const DesignSubtlePositivePressedButton = Stories.DesignSubtlePositivePressedButton;

export const DesignPrimaryNegativePressedButton = Stories.DesignPrimaryNegativePressedButton;
export const DesignSecondaryNegativePressedButton = Stories.DesignSecondaryNegativePressedButton;
export const DesignSubtleNegativePressedButton = Stories.DesignSubtleNegativePressedButton;

export const DesignButtonStates = Stories.DesignButtonStates;
export const DesignPrimaryButtonStates = Stories.DesignPrimaryButtonStates;
export const DesignSecondaryButtonStates = Stories.DesignSecondaryButtonStates;
export const DesignSubtleButtonStates = Stories.DesignSubtleButtonStates;

export const DesignPrimaryPositiveButtonStates = Stories.DesignPrimaryPositiveButtonStates;
export const DesignSecondaryPositiveButtonStates = Stories.DesignSecondaryPositiveButtonStates;
export const DesignSubtlePositiveButtonStates = Stories.DesignSubtlePositiveButtonStates;

export const DesignPrimaryNegativeButtonStates = Stories.DesignPrimaryNegativeButtonStates;
export const DesignSecondaryNegativeButtonStates = Stories.DesignSecondaryNegativeButtonStates;
export const DesignSubtleNegativeButtonStates = Stories.DesignSubtleNegativeButtonStates;

export const DesignDisabledButton = Stories.DesignDisabledButton;
export const DesignPrimaryDisabledButton = Stories.DesignPrimaryDisabledButton;
export const DesignSecondaryDisabledButton = Stories.DesignSecondaryDisabledButton;
export const DesignSubtleDisabledButton = Stories.DesignSubtleDisabledButton;

export const DesignAlleenEenIcon = Stories.DesignAlleenEenIcon;

export const AlleenEenIcon = Stories.AlleenEenIcon;
export const IconVoorHetLabel = Stories.IconVoorHetLabel;
export const IconAchterHetLabel = Stories.IconAchterHetLabel;
export const GeformatteerdLabel = Stories.GeformatteerdLabel;
export const GeformatteerdLabelEnEenIcon = Stories.GeformatteerdLabelEnEenIcon;
/*
export const ToggleButton = {
  ...Stories.ToggleButton,
  render: ({ label, children: _children, ...props }: ButtonProps) => {
    const [{ pressed, disabled }, updateArgs] = useArgs();

    function onClick() {
      if (Boolean(disabled) === false) {
        updateArgs({ pressed: !pressed });
      }
    }

    return <ButtonComponent {...props} label={pressed ? label : 'Klik mij!'} pressed={pressed} onClick={onClick} />;
  },
};
*/
export const VolleBreedte = Stories.VolleBreedte;
