import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    product(id: ID!): Product
  }

  type Product {
    id: ID!
    name: String
  }
`;

const resolvers = {
  Query: {
    product: (_, { id }) => ({ id, name: `Product ${id}` }),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 4001 } });
console.log(`🚀 Server ready at ${url}`);
