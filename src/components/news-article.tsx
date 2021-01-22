import React from "react"
import { RouteComponentProps, WindowLocation } from "@reach/router"
import { useQuery, gql } from "@apollo/client"
import { NewsArticleBase } from "./news-article-base"
import { navigate } from "gatsby"

type NewsArticleProps = React.FC<
  RouteComponentProps & { location?: WindowLocation<{ id: string }> }
>

const NewsArticle: NewsArticleProps = ({ location, staticPages, ...rest }) => {
  const { loading, error, data } = useQuery(NEWS_ARTICLE, {
    variables: { id: location.state?.id || "" },
  })
  React.useEffect(() => {
    if (staticPages.includes(`/about/media/news/${rest.slug}`)) {
      navigate(`/about/media/news/${rest.slug}`, { replace: true })
    }
  }, [])
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  const { newsArticle } = data
  return <NewsArticleBase {...newsArticle} />
}

const NEWS_ARTICLE = gql`
  query NewsArticle(
    $id: String!
    $locale: String = "en"
    $preview: Boolean = false
  ) {
    newsArticle(id: $id, locale: $locale, preview: $preview) {
      sys {
        id
      }
      title
      subtitle
      content
      location
      slug
      pressContact {
        title
        blockWidth
        contactContent {
          name
          jobTitle
          phoneNumber
          email
        }
      }
      tagsCollection(limit: 1) {
        items {
          tagName
        }
      }
      publicationDate
    }
  }
`

export default NewsArticle
