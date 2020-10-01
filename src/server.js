import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import { uploadMiddleware, uploadController } from "./upload";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

// express 서버에서 logger 미드웨어 (morgan)을 사용
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

// 옵션 추가 - port, callback 함수
server.start({ port: PORT }, () =>
  console.log(`✅Server running on port http://localhost:${PORT}`)
);
