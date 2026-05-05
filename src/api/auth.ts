import { createServerFn } from "@tanstack/react-start";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
    if (data.password === ADMIN_PASSWORD) {
      return { success: true, token: "admin-secret-token" };
    }
    throw new Error("Invalid password");
  });

export const verifyAdmin = (token?: string) => {
  if (token !== "admin-secret-token") {
    throw new Error("Unauthorized");
  }
};
