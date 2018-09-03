// @flow
/* eslint no-console: 0 */

import Unsplash, { toJson } from 'unsplash-js'

import type { OrderBy } from './types'

require('es6-promise').polyfill()
require('isomorphic-fetch')
require('dotenv').config()

type ReqQuery = {
  keyword?: string,
  orderBy?: OrderBy,
  page?: number,
}

const {
  UNSPLASH_CLIENT_ID,
  PHOTOS_PER_PAGE,
} = process.env

if (!UNSPLASH_CLIENT_ID) {
  console.error('UNSPLASH_CLIENT_ID env variable is missing!')
}

const PER_PAGE = PHOTOS_PER_PAGE || 30

const unsplash = new Unsplash({
  applicationId: UNSPLASH_CLIENT_ID,
})

export const getPopularPhotos = async (query: ReqQuery) => {
  const orderBy: OrderBy = query.orderBy || 'popular'

  try {
    const data = await unsplash.photos.listPhotos(0, PER_PAGE, orderBy)
      .then(toJson)
      .then(json => json)

    return data
  } catch (e) {
    console.error(e)

    return {
      error: e.message,
    }
  }
}

export const getPhotosByKeyword = async (query: ReqQuery) => {
  const page: number = +query.page || 0
  const keyword: string = query.keyword || ''

  try {
    const data = await unsplash.search.photos(keyword, page, PER_PAGE)
      .then(toJson)
      .then(json => json)
    data.next_page = page + PER_PAGE

    return data
  } catch (e) {
    console.error(e)

    return {
      error: e.message,
    }
  }
}
