/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require("path")
const fs = require("fs")
const { gql } = require("@apollo/client")
const { gqlPluckFromCodeString } = require("@graphql-tools/graphql-tag-pluck")
const { client } = require("./src/gatsby/client")

exports.createPages = async ({ actions }) => {
  const NEWS_ARTICLE_QUERY = await gqlPluckFromCodeString(
    "src/components/news-article.tsx",
    fs.readFileSync("src/components/news-article.tsx", "utf8")
  )

  const NEWS_ARTICLE_LIST_QUERY = await gqlPluckFromCodeString(
    "src/components/news-articles-list.tsx",
    fs.readFileSync("src/components/news-articles-list.tsx", "utf8")
  )

  const { data } = await client.query({
    query: gql`
      ${NEWS_ARTICLE_LIST_QUERY}
    `,
    variables: { limit: 100, skip: 0, from: "2018", to: "2021" },
  })

  await Promise.all(
    data.newsArticleCollection.items.map(async newsArticle => {
      const { page, slug } = newsArticle.linkedFrom.urlSlugCollection.items[0]
      const { data } = await client.query({
        query: gql`
          ${NEWS_ARTICLE_QUERY}
        `,
        variables: {
          id: page.sys.id,
          locale: "en",
          preview: false,
        },
      })

      return actions.createPage({
        path: slug,
        component: path.resolve("./src/templates/news-article.tsx"),
        context: {
          id: page.sys.id,
          newsArticle: data.newsArticle,
        },
      })
    })
  )

  actions.createPage({
    path: "/about/media/news-article",
    matchPath: "/about/media/news-article/*",
    component: path.resolve("./src/templates/news-article-live.tsx"),
  })
}
