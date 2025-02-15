import { formatUnits } from "viem"

export const formatEthBalance = (value: bigint | undefined) => {
  if (!value) return "N/A"

  const eth = Number(formatUnits(value, 18))

  return `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(eth)} ETH`
}
