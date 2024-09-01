import { User } from "@prisma/client";
import NextAuth from "next-auth";

interface IUser extends Omit<User, "id"> {
  id: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser;
  }
}
