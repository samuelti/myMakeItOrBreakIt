const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    savedStocks: [Stock]
  }

  type Stock {
    ticker: ID!
    name: String!
  }

  input StockInput {
    ticker: String!
    name: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveStock(stockData: StockInput!): User
    removeStock(ticker: ID!): User
  }
`;

module.exports = typeDefs;
