import type { APIRoute } from "astro";

export const get: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete("session_token", {
    path: "/",
  });
  return redirect("/signin");
};