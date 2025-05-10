"use client"
import { ThemeProvider } from "@mui/material"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { MuiTheme } from "src/theme/muitheme"
import { wagmiClient } from "@config/client"

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiClient}>{children}</WagmiProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
