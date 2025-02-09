export const trimAddress = (
  address: string,
  start: number = 7,
  end: number = 5,
) => {
  return `${address.slice(0, start)}...${address.slice(-end)}`
}
