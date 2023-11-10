/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [`gatsby-plugin-sass`],
  pathPrefix: "/dos-culturas-blog",
  flags: {
    DEV_SSR: true
  },
}
