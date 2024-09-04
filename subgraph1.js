import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from "graphql-tag";
import { readFileSync } from "fs";
import { buildSubgraphSchema } from '@apollo/subgraph';

const schema = readFileSync("./subgraph1.graphqls", "utf8");
const typeDefs = gql(schema);
const resolvers = {
    Query: {
        animals: (query) => {
            return [
            {
                __typename: "Cat",
                id: "cat",
                name: "Cat",
                image: {url: "http://catimage"}
            },{
                __typename: "Dog",
                id: "dog",
                name: "Dog",
                image: {url: "http://dogimage"}
            }
            ];
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 }
});
console.log(`🚀  Server ready at ${url}`);
