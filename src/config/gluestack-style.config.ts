import { config as defaultConfig } from "@gluestack-ui/config";
import { createConfig } from "@gluestack-ui/themed";

export const config = createConfig({
  ...defaultConfig,
  components: {
    ...defaultConfig.components,
    Button: {
      ...defaultConfig.components.Button,
      theme: {
        ...defaultConfig.components.Button.theme,
        variants: {
          ...defaultConfig.components.Button.theme.variants,
          action: {
            primary: {
              bg: "$backgroundDarkError",
              ":active:": {
                bg: "backgroundLightError",
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
