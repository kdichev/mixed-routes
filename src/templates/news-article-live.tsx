import React from "react"
import { graphql } from "gatsby"
import { Router, RouteComponentProps } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsTemplate from "./../components/news-article"

const Default: React.FC<RouteComponentProps> = () => {
  return <div>404</div>
}

const SecondPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Page two" />
      <Router basepath="/about/media/news-article">
        <NewsTemplate path="/:slug" />
        <Default path="/" />
      </Router>
    </Layout>
  )
}

export default SecondPage
