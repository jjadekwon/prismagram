// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({path: path.resolve(__dirname, ".env")}); // 상위 폴더에 .env 파일이 존재하지 않을 경우, 자동으로 불러와지지 않아서 설정 필요

import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import {prisma} from "../generated/prisma-client";

const jwtOptions = {
    // Authorization 헤더에서 jwt를 찾음
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    
    // 토큰을 암호화하기 위한 문자열
    secretOrKey: process.env.JWT_SECRET
};

// done : 사용자를 찾았을 때 호출해야 하는 함수
const verifyUser = async(payload, done) => {
    try {
        // user를 payload 정보로 찾기
        const user = await prisma.user({id: payload.id});
        if (user !== null) {
            return done(null, user);    // null : no error
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}

// 미들웨어 함수
// 이 미들웨어가 실행되면 passport.authenticate함수가 실행됨
export const authenticateJwt = (req, res, next) => passport.authenticate("jwt", {session: false}, (error, user) => {
    if (user) {
        req.user = user;
    }
    next();
})(req, res, next);

// callback - 옵션이 잘 맞게 적용되었을 때 JwtStrategy함수가 토큰을 해석 (사용자 정보가 암호화되어 토큰에 담김)
// 그리고 해석된 정보를 콜백 함수로 전달
passport.use(new Strategy(jwtOptions, verifyUser));

passport.initialize();