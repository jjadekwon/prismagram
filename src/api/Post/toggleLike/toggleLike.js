import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async(_, args, { request }) => {
            isAuthenticated(request);
            const { postId } = args;
            const { user } = args;
            try {
                const existingLike = await prisma.$exists.like({
                    AND: [
                        {
                            user: {
                                id: user.id
                            }
                        },
                        {
                            post: {
                                id: post.id
                            }
                        }
                    ]
                });
    
                if (existingLike) {
                    // to do
                    // delete
                } else {
                    const newLike = await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        post: {
                            connect: {
                                id: post.id
                            }
                        }
                    });
                }
                return true;
            } catch {
                return false;
            }
        }
    }
};