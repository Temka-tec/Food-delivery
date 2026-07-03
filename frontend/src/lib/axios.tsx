import axios from "axios";

// The Next.js rewrite maps /backend to the local Prisma-backed API routes.
export const api = axios.create({
  baseURL: "/backend",
  headers: { "Content-Type": "application/json" },
});
