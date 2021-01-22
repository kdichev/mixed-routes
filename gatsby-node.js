/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require("path")

exports.createPages = ({ actions }) => {
  actions.createPage({
    path: "/news/hello-world",
    component: path.resolve("./src/templates/news-article.tsx"),
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/news-article/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/news-article/*"
    // Update the page.
    createPage(page)
  }
}
