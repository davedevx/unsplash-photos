// @flow

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export type Notification = {
  type: NotificationType,
  title: string,
  description?: string,
}

export type OrderBy = 'latest' | 'popular' | 'oldest'

type PhotoLink = {
  download: string,
  download_location: string,
  html: string,
  self: string,
}

type PhotoUrl = {
  full: string,
  raw: string,
  regular: string,
  small: string,
  thumb: string,
}

export type Photo = {
  id: string,
  created_at: Date,
  description: string,
  width: number,
  height: number,
  likes: number,
  links: PhotoLink,
  urls: PhotoUrl,
}

export type PhotoSearchResult = {
  next_page: number,
  results: Photo[],
  total: number,
  total_pages: number,
}
