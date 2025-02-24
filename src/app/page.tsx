import { Box } from "@mui/material"

import { ButtonConnectWallet } from "@components/ButtonConnectWallet"
import { Balance } from "@components/Balance"
import { TokenBalance } from "@components/TokenBalance"
import { Header } from "@components/Header"

export function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <TokenBalance />
      <Balance />
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 6,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          minWidth: 600,
          justifyContent: "center",
          minHeight: 400,
        }}
      >
        <ButtonConnectWallet />
      </Box>
    </Box>
  )
}

export default HomePage
