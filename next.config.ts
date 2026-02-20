import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  rewrites: async () => {
    return {
      beforeFiles: [
        // Admin: admin.baxauk.com/es/foo → /es/admin/foo
        {
          source: "/:locale/:path*",
          destination: "/:locale/admin/:path*",
          has: [{ type: "host", value: "admin.(?<subdomain>.*)" }],
        },
        // Vendor: app.baxauk.com/es/foo → /es/vendor/foo
        {
          source: "/:locale/:path*",
          destination: "/:locale/vendor/:path*",
          has: [{ type: "host", value: "app.(?<subdomain>.*)" }],
        },
        // Public: baxauk.com/es/foo → /es/public/foo
        {
          source: "/:locale/:path*",
          destination: "/:locale/public/:path*",
          missing: [
            { type: "host", value: "admin.(?<subdomain>.*)" },
            { type: "host", value: "app.(?<subdomain>.*)" },
          ],
        },
      ],
    };
  },
};

export default withNextIntl(nextConfig);