import React from "react"
import { ApolloProvider } from "@apollo/client"
import { client } from "./client"

export const WrapRootElement = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
