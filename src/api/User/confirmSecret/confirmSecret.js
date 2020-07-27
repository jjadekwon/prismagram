import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async(_, args, { request }) => {
            const {email, secret} = args;
            const user = await prisma.user({email});
            if (user.loginSecret === secret) {
                // 로그인이 확인되면 loginSecret 삭제
                await prisma.updateUser({
                    where: { id: user.id },
                    data: { loginSecret: "" }
                });

                return generateToken(user.id);
            } else {
                throw Error("Wrong email/secret combination.");
            }
        }
    }
}