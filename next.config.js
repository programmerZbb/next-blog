/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  webpack: (config) => {
    // camel-case style names from css modules
    config.module.rules
      .find(({ oneOf }) => !!oneOf)
      .oneOf.filter(({ use }) => JSON.stringify(use)?.includes("css-loader"))
      .reduce((acc, { use }) => acc.concat(use), [])
      .forEach(({ options }) => {
        if (options && options.modules) {
          options.modules.exportLocalsConvention = "camelCase";
        }
      });
    config.module.rules.push({
      test: /\.svg$/i,
	  issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack", 'url-loader'],
    });

    return config;
  },
};

module.exports = nextConfig;
