import React from "react"
import { Link } from "gatsby"
import { Router, RouteComponentProps } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { NewsArticleBase } from "./../components/news-article-base"

const Default: React.FC<RouteComponentProps> = () => {
  return <div>not Found</div>
}

const SecondPage = ({ pageContext }) => {
  return (
    <Layout>
      <SEO title="Page two" />
      <NewsArticleBase {...pageContext.newsArticle} />
    </Layout>
  )
}

export default SecondPage
