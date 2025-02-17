import { formatUnits } from "viem"

type FormatNumberOptions = {
  decimals?: number
  locale?: string
  minFractionDigits?: number
  maxFractionDigits?: number
}

export const formatNumber = (
  value: bigint | undefined,
  {
    decimals = 18,
    locale = "en-US",
    minFractionDigits = 4,
    maxFractionDigits = 4,
  }: FormatNumberOptions = {},
): string | null => {
  if (value === undefined) return null

  const number = Number(formatUnits(value, decimals))

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  }).format(number)
}
