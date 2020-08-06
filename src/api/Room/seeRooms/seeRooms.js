import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeRooms: (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);

            const { user } = requeset;
            return prisma.rooms({
                where: {
                    participants_some: {
                        id: user.id
                    }
                }
            });
        }
    }
}