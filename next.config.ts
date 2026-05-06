import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    "/**": ["./src/generated/prisma/**/*"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/workflows",
        permanent: false,
      }
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options
  org: "college-major-project",
  project: "flow-forge",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: "/monitoring",

  // --- MOVED / UPDATED OPTIONS ---
  
  // Enables automatic instrumentation of Vercel Cron Monitors. 
  // Moved to the top level (no longer nested in `webpack`).
  automaticVercelMonitors: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size.
  // This replaces the old `webpack: { treeshake: { removeDebugLogging: true } }`.
  disableLogger: true,
});