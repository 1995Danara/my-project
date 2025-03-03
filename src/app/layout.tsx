"use client"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { Client } from "src/config/client"
import { MuiTheme } from "src/theme/muitheme"
const queryClient = new QueryClient()

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={Client}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={MuiTheme} />
            <CssBaseline />
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
