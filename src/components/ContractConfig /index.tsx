import { erc20Abi } from "viem"

import { TOKEN_ADDRESS } from "utils/constans"

export const ContractConfig = {
  address: TOKEN_ADDRESS,
  abi: erc20Abi,
}
