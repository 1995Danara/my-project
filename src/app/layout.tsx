"use client"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"

import { wagmiClient } from "src/config/client"
import store from "src/store"
import { ThemeProvider } from "@mui/material"
import { MuiTheme } from "src/theme/muitheme"

const queryClient = new QueryClient()

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={MuiTheme}>
        <Provider store={store}>
          <WagmiProvider config={wagmiClient}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </WagmiProvider>
        </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
