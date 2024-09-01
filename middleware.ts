export { default } from "next-auth/middleware";

// TODO: Tambahkan withauth apabila role bukan admin tdk bisa mengakses route tertentu

export const config = { matcher: ["/controller/:path*"] };
