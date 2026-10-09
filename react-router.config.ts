import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  // SPA mode: auth state lives in the browser (in-memory token + API-scoped
  // cookie), so a runtime server could never render authenticated pages.
  ssr: false,
} satisfies Config;
