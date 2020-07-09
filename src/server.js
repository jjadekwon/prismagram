import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")}); // 상위 폴더에 .env 파일이 존재하지 않을 경우, 자동으로 불러와지지 않아서 설정 필요

import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import {sendSecretMail} from "./utils"

sendSecretMail("kwonmminji@naver.com", "123");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({schema});

// express 서버에서 logger 미드웨어 (morgan)을 사용
server.express.use(logger("dev"));

// 옵션 추가 - port, callback 함수
server.start({port:PORT}, () => console.log(`✅Server running on port http://localhost:${PORT}`));