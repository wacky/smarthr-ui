import { merge } from '../libs/lodash'

const defaultHtmlFontSize = 16
const defaultSpace = 8

export interface SizeProperty {
  htmlFontSize?: number
  space?: {
    defaultRem?: number
    xxs?: number
    xs?: number
    s?: number
    m?: number
    l?: number
    xl?: number
    xxl?: number
  }
  // respect for Starbucks...
  font?: {
    tasting?: number
    short?: number
    tall?: number
    grande?: number
    venti?: number
    trenta?: number
  }
  mediaQuery?: {
    sp?: number
    tablet?: number
  }
}

export interface CreatedSizeTheme {
  pxToRem: (value: number) => string
  space: {
    xxs: number
    xs: number
    s: number
    m: number
    l: number
    xl: number
    xxl: number
  }
  font: {
    tasting: number
    short: number
    tall: number
    grande: number
    venti: number
    trenta: number
  }
  mediaQuery: {
    sp: number
    tablet: number
  }
}

const defaultSize = {
  font: {
    tasting: 12,
    short: 13,
    tall: 14,
    grande: 16,
    venti: 20,
    trenta: 22,
  },
  mediaQuery: {
    sp: 599,
    tablet: 959,
  },
}

export const createSize = (userSize: SizeProperty = {}) => {
  const space = userSize.space || {}
  const xxs = space.defaultRem || defaultSpace
  const created: CreatedSizeTheme = merge(
    {
      pxToRem: (value: number): string =>
        `${value / (userSize.htmlFontSize || defaultHtmlFontSize)}rem`,
      space: {
        xxs,
        xs: xxs * 2,
        s: xxs * 3,
        m: xxs * 4,
        l: xxs * 5,
        xl: xxs * 6,
        xxl: xxs * 7,
      },
      ...defaultSize,
    },
    userSize,
  )

  return created
}
