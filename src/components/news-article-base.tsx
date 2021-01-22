import React from "react"

export const NewsArticleBase = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h4>{props.subtitle}</h4>
      <p>{props.content}</p>
    </div>
  )
}
