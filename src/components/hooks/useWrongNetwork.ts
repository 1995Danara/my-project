import { useAccount } from "wagmi"

import { TARGET_NETWORK_ID } from "../../../networkConfig"

export const useIsWrongNetwork = () => {
  const { chain } = useAccount()
  return chain?.id !== TARGET_NETWORK_ID
}
