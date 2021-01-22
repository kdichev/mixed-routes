import React from "react"
import { WrapRootElement } from "./src/gatsby/wrap-root-element"

export const wrapRootElement = ({ element }) => {
  return <WrapRootElement>{element}</WrapRootElement>
}
