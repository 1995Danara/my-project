import { Button } from "@mui/material"

import { ContractConfig } from "@config/contract-config"
import { addTokenMetaMask } from "@components/AddTokenMetamask"

export const MetaMaskTokenButton = () => {
  const tokenAddress = ContractConfig.address
  const tokenSymbol = "MTK"
  const tokenDecimals = 18
  return (
    <Button
      sx={{
        borderRadius: "30px",
      }}
      size="large"
      variant="contained"
      color="secondary"
      onClick={() => addTokenMetaMask(tokenAddress, tokenDecimals, tokenSymbol)}
    >
      Add a token to MetaMask
    </Button>
  )
}
