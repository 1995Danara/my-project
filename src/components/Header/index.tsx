"use client"
import { AppBar, Toolbar, Box, Typography, useTheme } from "@mui/material"

import { ConnectWalletButton } from "@components/ConnectWalletButton"

export const Header = () => {
  const theme = useTheme()

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.primary.main,
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
          MetaCoin
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          <ConnectWalletButton />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
