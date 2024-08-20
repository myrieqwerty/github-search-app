import { GraphQLClient } from "graphql-request"

const ENDPOINT = 'https://api.github.com/graphql'

const TOKEN = import.meta.env["VITE_GH_TOKEN"]

export const client = new GraphQLClient(ENDPOINT, {
  headers: {
    authorization: `Bearer ${TOKEN}`
  }
})