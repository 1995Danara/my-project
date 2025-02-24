import { createTheme } from "@mui/material"

export const COLORS = {
  darkPurple: "#331488",
  purple: "#4313CC",
  lightPurple: "#EBE9FF",
  lightGrey: "#F2F2F2",
  grey: "#A7A7A7",
  darkGrey: "#666",
  greyText: "#666",
  white: "#FFF",
  black: "#000",
}

export const MuiTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.purple,
      contrastText: COLORS.white,
    },
    secondary: {
      main: COLORS.lightPurple,
      contrastText: COLORS.black,
    },
    background: {
      default: COLORS.lightGrey,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          const isPrimary = ownerState.color === "primary"
          const isLarged = ownerState.size === "large"

          return {
            textTransform: "uppercase",
            padding: isLarged ? "12px 32px" : "12px 24px",
            fontSize: isLarged ? "32px" : "18px",
            fontWeight: isPrimary ? "700" : "500",
            gap: "10px",
            borderRadius: 6,

            "&:hover": {
              color: COLORS.white,
              backgroundColor: isPrimary ? COLORS.darkPurple : COLORS.purple,
            },
            "&:disabled": {
              color: isPrimary ? COLORS.grey : COLORS.darkGrey,
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), ${COLORS.lightPurple}`,
            },
          }
        },
      },
    },
  },
  typography: {
    fontFamily: ["Urbanist", "sans-serif"].join(","),
    fontSize: 16,
  },
})
