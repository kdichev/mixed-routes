import React from "react"
import { Link } from "gatsby"
import { Router, RouteComponentProps } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsTemplate from "./../components/news-article"

const Default: React.FC<RouteComponentProps> = () => {
  return <div>not Found</div>
}

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <NewsTemplate />
  </Layout>
)

export default SecondPage
