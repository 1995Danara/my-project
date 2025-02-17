import { erc20Abi } from "viem"

import { CONFIG } from "utils/constans"

export const ContractConfig = {
  address: CONFIG.TOKEN_ADDRESS,
  abi: erc20Abi,
}
