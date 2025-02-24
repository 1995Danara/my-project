"use client"
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material"

import { ButtonConnectWallet } from "@components/ButtonConnectWallet"

export const Header = () => {
  const theme = useTheme()

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.secondary.main,
        padding: "0 16px",
        minHeight: "64px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.common.white }}>
          TILES
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          <ButtonConnectWallet showTitle={false} />
          <IconButton
            sx={{
              backgroundColor: theme.palette.error.main,
              width: "50px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              borderRadius: 3,
            }}
          />
          <IconButton
            sx={{
              backgroundColor: theme.palette.common.white,
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              marginLeft: "12px",
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
