import { useQuery, gql } from "@apollo/client"

export const useSlugQuery = ({ slug }) =>
  useQuery(
    gql`
      query ID($slug: String!) {
        urlSlugCollection(where: { slug: $slug }) {
          items {
            page {
              ... on NewsArticle {
                sys {
                  id
                }
              }
            }
          }
        }
      }
    `,
    { variables: { slug: `about/media/news/${slug}` } }
  )
