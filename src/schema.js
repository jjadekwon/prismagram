import {makeExecutableSchema} from "graphql-tools";
import {fileLoader, mergeResolvers, mergeTypes} from "merge-graphql-schemas";
import path from "path"

// fileLoader 함수의 결과물, file Loader(파일 경로)
// ** : 모든 폴더, *.graphql : 모든 .graphql 파일
// api 폴더 밑의 모든 폴더에서 graphql 파일만 가져옴
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
})

export default schema;