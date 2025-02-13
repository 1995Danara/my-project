import { Address } from "viem"

export const trimAddress = (
  address: Address,
  start: number = 7,
  end: number = 5,
) => {
  return `${address.slice(0, start)}...${address.slice(-end)}`
}
