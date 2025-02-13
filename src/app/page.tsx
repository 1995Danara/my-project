import { ButtonConnectWallet } from "@/components/ButtonConnectWallet"
import { Box, Typography } from "@mui/material"
export function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
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
