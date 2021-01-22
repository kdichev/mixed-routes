import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useQuery, gql } from "@apollo/client"

const GET_NEWSARTICLES = gql`
  query NewsArticle(
    $from: DateTime!
    $to: DateTime!
    $limit: Int = 3
    $skip: Int = 0
  ) {
    newsArticleCollection(
      where: { publicationDate_gt: $from, publicationDate_lt: $to }
      limit: $limit
      skip: $skip
      order: publicationDate_DESC
    ) {
      total
      items {
        linkedFrom {
          urlSlugCollection(limit: 1) {
            items {
              slug
            }
          }
        }
        image {
          title
          description
          url
        }
        title
        subtitle
        location
        publicationDate
      }
    }
  }
`
const IndexPage = () => {
  const { loading, error, data } = useQuery(GET_NEWSARTICLES, {
    variables: { limit: 10, skip: 0, from: "2016", to: "2017" },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.newsArticleCollection.items.map(newsArticle => (
          <Link
            to={`/${newsArticle.linkedFrom.urlSlugCollection.items[0].slug}`}
          >
            {newsArticle.title}
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
