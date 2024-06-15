import { createElement } from 'react'

export const nl2br = (text: string) =>
    text
      .split('\n')
      .map((line, index) => [line, createElement('br', { key: index })])
      .flat()
      .slice(0, -1)
