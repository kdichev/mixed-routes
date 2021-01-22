import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { NewsArticleCollection } from "../components/news-articles-list"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <NewsArticleCollection
        staticPages={data.allSitePage.nodes.map(node => node.path)}
      />
    </Layout>
  )
}

export const query = graphql`
  query TEST {
    allSitePage(filter: { path: { regex: "/about/media/news/" } }) {
      nodes {
        path
      }
    }
  }
`

export default IndexPage
