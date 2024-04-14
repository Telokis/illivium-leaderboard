"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Add some colors, make the theme prettier with a blue-ish tone
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#121212",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiPaper: {
      defaultProps: {
        square: true,
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#545454",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {},
    },
  },
});

export default theme;
