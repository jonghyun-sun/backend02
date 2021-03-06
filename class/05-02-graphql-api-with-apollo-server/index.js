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
  console.log(`π Server ready at ${url}`);
});//μ΄λμ μλ²κ° μΌμ‘κ³  λͺλ² ν¬νΈλ‘ μΌμ‘λμ§