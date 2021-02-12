import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { NewsArticleBase } from "./../components/news-article-base"

const SecondPage = ({ pageContext }) => {
  return (
    <Layout>
      <SEO title="Page two" />
      <NewsArticleBase {...pageContext.newsArticle} />
    </Layout>
  )
}

export default SecondPage
