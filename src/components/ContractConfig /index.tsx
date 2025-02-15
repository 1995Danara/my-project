import { erc20Abi } from "viem"

export const ContractConfig = {
  address: process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS as `0x${string}`,
  abi: erc20Abi,
}
