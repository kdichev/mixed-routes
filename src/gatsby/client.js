const fetch = require("isomorphic-fetch")
const {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} = require("@apollo/client")

const link = createHttpLink({
  fetch,
  uri:
    "https://graphql.contentful.com/content/v1/spaces/mivicpf5zews/environments/dev?access_token=ffb6d2e75bdeb11580a166b1856d1b183e180c6da95a97998ab50cd12ad9eb85",
})

exports.client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
