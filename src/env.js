import dotenv from 'dotenv';
import path from "path";

// 상위 폴더에 .env 파일이 존재하지 않을 경우, 자동으로 불러와지지 않아서 설정 필요
dotenv.config({path: path.resolve(__dirname, ".env")});