import { ButtonConnectWallet } from "@/components/ButtonConnectWallet"
import { Box, Typography } from "@mui/material"
import { Balance } from "@/components/Balance"
import { TokenBalance } from "@/components/TokenBalance"

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
        <Typography
          variant="h5"
          sx={{ textTransform: "uppercase", padding: 4 }}
        >
          Connect Wallet
        </Typography>
        <ButtonConnectWallet />
      </Box>
    </Box>
  )
}

export default HomePage
