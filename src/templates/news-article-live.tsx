import React from "react"
import { Router, RouteComponentProps } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsTemplate from "./../components/news-article"
import { graphql } from "gatsby"

const Default: React.FC<RouteComponentProps> = () => {
  return <div>404</div>
}

const SecondPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Page two" />
      <Router basepath="/about/media/news-article">
        <NewsTemplate
          path="/:slug"
          staticPages={data.allSitePage.nodes.map(node => node.path)}
        />
        <Default path="/" />
      </Router>
    </Layout>
  )
}

export const query = graphql`
  query TEST_1 {
    allSitePage(filter: { path: { regex: "/about/media/news/" } }) {
      nodes {
        path
      }
    }
  }
`

export default SecondPage
