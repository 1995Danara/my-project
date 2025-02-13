export const ContractConfig = {
  address: "0xCaD8610808Ba58c03f21F9Ecd3b12D5A26D58760" as `0x${string}`,
  abi: [
    {
      type: "function",
      name: "balanceOf",
      stateMutability: "view",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "totalSupply",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "supply", type: "uint256" }],
    },
    {
      type: "function",
      name: "owner",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "", type: "address" }],
    },
  ],
}
