require("dotenv").config();
import {GraphQLServer} from "graphql-yoga";

const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query {
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hi"
    }
};

const server = new GraphQLServer({typeDefs, resolvers});

// 옵션 추가 - port, callback 함수
server.start({port:PORT}, () => console.log(`Server running on port http://localhost:${PORT}`));