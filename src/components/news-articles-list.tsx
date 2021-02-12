import React from "react"
import { Link } from "gatsby"
import { useQuery, gql } from "@apollo/client"

export const NewsArticleCollection = ({ staticPages }) => {
  const { loading, error, data } = useQuery(GET_NEWSARTICLES_LIST, {
    variables: { limit: 100, skip: 0, from: "2020", to: "2021" },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  const { newsArticleCollection } = data
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {newsArticleCollection.items.map(({ linkedFrom, title }) => {
        const { slug, page } = linkedFrom.urlSlugCollection.items[0]
        const isStatic = staticPages.includes(`/${slug}`)
        const liveSlug = `/news-article/${slug.replace(
          "about/media/news/",
          ""
        )}`
        const pageSlug = isStatic ? slug : `about/media${liveSlug}`
        return (
          <Link
            key={title}
            to={pageSlug}
            state={{
              id: page.sys.id,
            }}
          >
            {title}
          </Link>
        )
      })}
    </div>
  )
}

const GET_NEWSARTICLES_LIST = gql`
  query GET_NEWSARTICLES_LIST(
    $from: DateTime!
    $to: DateTime!
    $limit: Int = 10
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
              page {
                ... on NewsArticle {
                  __typename
                  sys {
                    id
                  }
                }
              }
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
