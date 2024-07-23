import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      rol: string;
      nombreResponsable: string;
      token: string;
    };
  }
}