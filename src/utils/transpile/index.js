import React from 'react'
import transform from './transform'
import errorBoundary from './errorBoundary'
import evalCode from './evalCode'

export const generateElement = (
  { code = '', scope = {} },
  errorCallback
) => (
  errorBoundary(
    evalCode(
      `return (${transform(code)})`,
      { ...scope, React }
    ),
    errorCallback
  )
)

export const renderElementAsync = (
  { code = '', scope = {} },
  resultCallback,
  errorCallback
) => {
  const render = element => {
    resultCallback(
      errorBoundary(
        element,
        errorCallback
      )
    )
  }

  if (!/render\s*\(/.test(code)) {
    return errorCallback(
      new SyntaxError('No-Inline evaluations must call `render`.')
    )
  }

  evalCode(
    transform(code),
    { ...scope, render, React }
  )
}
