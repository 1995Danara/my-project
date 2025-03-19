export const addTokenMetaMask = async (
  tokenAddress: string,
  tokenDecimals: number,
  tokenSymbol: string,
) => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            decimals: tokenDecimals,
            symbol: tokenSymbol,
          },
        },
      })
    } catch (error) {
      console.log("error", error)
    }
  }
}
