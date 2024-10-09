import { auth } from "./app/_lib/Auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
