import { ApolloServer, gql } from'apollo-server' ;

// The GraphQL schema
const myTypeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const myResolvers = {
  Query: {
    hello: () =>  'hello world',
  },
};

const server = new ApolloServer({
  typeDefs:myTypeDefs,
  resolvers:myResolvers,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});//어디서 서버가 켜졌고 몇번 포트로 켜졌는지