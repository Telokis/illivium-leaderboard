import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Preview, StoryFn } from "@storybook/react";
import theme from "../src/theme";

export const withMuiTheme = (Story: StoryFn) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
