import React from "react"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import fetch from "isomorphic-fetch"

export const link = createHttpLink({
  fetch,
  uri:
    "https://graphql.contentful.com/content/v1/spaces/mivicpf5zews/environments/master?access_token=ffb6d2e75bdeb11580a166b1856d1b183e180c6da95a97998ab50cd12ad9eb85",
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export const WrapRootElement = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
