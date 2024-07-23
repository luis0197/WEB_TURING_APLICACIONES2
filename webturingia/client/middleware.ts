export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/carga/:path*","/Ibiologicas/:path*","/Imedicas/:path*"],
};
