import type { Configuration, RuleSetRule } from "webpack"

const nextConfig = {
  webpack(config: Configuration) {
    if (!config.module?.rules) return config

    const fileLoaderRule = config.module.rules.find(
      (rule) =>
        typeof rule === "object" &&
        rule !== null &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg"),
    ) as RuleSetRule | undefined

    if (!fileLoaderRule) return config

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ["@svgr/webpack"],
      },
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default nextConfig
