import React from "react"
import { RouteComponentProps, WindowLocation } from "@reach/router"
import { useQuery, gql, useLazyQuery } from "@apollo/client"
import { NewsArticleBase } from "./news-article-base"
import { useSlugQuery } from "./slug-query"

type NewsArticleProps = React.FC<RouteComponentProps>

const NewsArticle: NewsArticleProps = ({ slug }) => {
  const { data: test } = useSlugQuery({ slug })
  const [getArticle, { loading, error, data }] = useLazyQuery(NEWS_ARTICLE)
  React.useEffect(() => {
    if (test?.urlSlugCollection.items[0].page.sys.id) {
      getArticle({
        variables: { id: test?.urlSlugCollection.items[0].page.sys.id },
      })
    }
  }, [test?.urlSlugCollection.items[0].page.sys.id])
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error... {error.message}</p>
  if (!data) return null
  const { newsArticle } = data
  return <NewsArticleBase {...newsArticle} />
}

const NEWS_ARTICLE = gql`
  query NEWS_ARTICLE(
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
