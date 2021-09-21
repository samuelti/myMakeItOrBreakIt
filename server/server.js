const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schema");
const { decodeToken } = require("./utils/auth");
const db = require("./config/config.js");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || "";
    console.log("context token: ", token);
    // Try to retrieve a user with the token
    const user = token ? decodeToken(token.split(" ").pop().trim()).data : null;
    // Add the user to the context
    return { user };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
});
