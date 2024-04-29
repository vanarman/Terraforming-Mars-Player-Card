import { config as defaultConfig } from "@gluestack-ui/config";
import { createConfig } from "@gluestack-ui/themed";

export const config = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      tBrown: "#6f2c0d",
      tLightBrown: "#b47a58",
      tDarkBrown: "#3f2413",
      tSand: "#e8d6af",
      tLightPeach: "#ddbbac",
      tRed: "#b4281e",
    },
  },
  components: {
    ...defaultConfig.components,
    SliderTrack: {
      ...defaultConfig.components.SliderTrack,
      theme: {
        ...defaultConfig.components.SliderTrack.theme,
        bg: "$tSand",
      },
    },
    SliderFilledTrack: {
      ...defaultConfig.components.SliderFilledTrack,
      theme: {
        ...defaultConfig.components.SliderFilledTrack.theme,
        bg: "$tDarkBrown",
        ":active": {
          bg: "$tLightBrown",
        },
        ":focus": {
          bg: "$tLightBrown",
        },
        ":hover": {
          bg: "$tLightBrown",
        },
      },
    },
    SliderThumb: {
      ...defaultConfig.components.SliderThumb,
      theme: {
        ...defaultConfig.components.SliderThumb.theme,
        bg: "$tDarkBrown",
        ":active": {
          bg: "$tLightBrown",
        },
        ":focus": {
          bg: "$tLightBrown",
        },
        ":hover": {
          bg: "$tLightBrown",
        },
      },
    },
    Button: {
      ...defaultConfig.components.Button,
      theme: {
        ...defaultConfig.components.Button.theme,
        variants: {
          ...defaultConfig.components.Button.theme.variants,
          variant: {
            ...defaultConfig.components.Button.theme.variants.variant,
            outline: {
              ...defaultConfig.components.Button.theme.variants.variant.outline,
              borderColor: "$tDarkBrown",
              bg: "$tLightBrown",
              ":active": {
                bg: "$tLightBrown",
                _text: {
                  color: "$tLightBrown",
                },
              },
              ":focus": {
                bg: "$tLightBrown",
                _text: {
                  color: "$tLightBrown",
                },
              },
              ":hover": {
                bg: "$tLightBrown",
                _text: {
                  color: "$tLightBrown",
                },
              },
            },
          },
          action: {
            ...defaultConfig.components.Button.theme.variants.action,
            primary: {
              ...defaultConfig.components.Button.theme.variants.action.primary,
              bg: "$tDarkBrown",
              ":active": {
                bg: "$tLightBrown",
              },
              ":focus": {
                bg: "$tLightBrown",
              },
              ":hover": {
                bg: "$tLightBrown",
              },
            },
            negative: {
              ...defaultConfig.components.Button.theme.variants.action.negative,
              bg: "$tRed",
              ":active": {
                bg: "$tLightPeach",
              },
              ":focus": {
                bg: "$tLightPeach",
              },
              ":hover": {
                bg: "$tLightPeach",
              },
            },
            secondary: {
              ...defaultConfig.components.Button.theme.variants.action
                .secondary,
              _text: {
                color: "$tDarkBrown",
              },
            },
          },
        },
      },
    },
  },
});

type Config = typeof config;

declare module "@gluestack-style/react" {
  interface ICustomConfig extends Config {}
}
