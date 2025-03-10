import { Button } from "@mui/material"

import { TokenContractConfig } from "@config/contract-config"
import { addTokenMetaMask } from "@utils/utils"

export const MetaMaskTokenButton = () => {
  const tokenAddress = TokenContractConfig.address
  const tokenSymbol = "MTK"
  const tokenDecimals = 18
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => addTokenMetaMask(tokenAddress, tokenDecimals, tokenSymbol)}
    >
      Add a token to MetaMask
    </Button>
  )
}
