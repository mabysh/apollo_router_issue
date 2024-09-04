import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from "graphql-tag";
import { readFileSync } from "fs";
import { buildSubgraphSchema } from '@apollo/subgraph';

const schema = readFileSync("./subgraph2.graphqls", "utf8");
const typeDefs = gql(schema);
const resolvers = {
    Query: {
        hi() {
            return "hi";
        }
    },
    Image: {
        __resolveReference: (i) => {
            return { ...i };
        },
        resized: (i, input) => {
            return i.url.concat('?width=')
                .concat(input.width)
                .concat('&height=')
                .concat(input.height);
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 }
});
console.log(`🚀  Server ready at ${url}`);
