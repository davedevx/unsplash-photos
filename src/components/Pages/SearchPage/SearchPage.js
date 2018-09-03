// @flow

import React, { type Node as ReactNode } from 'react'

import withPhotoSearch from './withPhotoSearch'
import './SearchPage.css'

const SearchPage = (): ReactNode => (
  <header className="page-header">
    <h1 className="title is-1">Photo Search</h1>
  </header>
)

export default withPhotoSearch(SearchPage)
