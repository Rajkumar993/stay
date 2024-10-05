const { ApolloClient, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
    uri: "https://api.shop.strackit.com/graphql",
    cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//     uri: "http://localhost:8000/graphql",
//     cache: new InMemoryCache(),
// });

export default client;