export const BASE_API =
  import.meta.env.VITE_ENV === "dev"
    ? "http://localhost:4000/api"
    : "https://backend-firefly.vercel.app/api";
export type ApiStatus = "idle" | "loading" | "succeeded" | "failed";
