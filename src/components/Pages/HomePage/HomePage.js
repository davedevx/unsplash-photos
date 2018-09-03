// @flow

import React, { type Node as ReactNode } from 'react'

import withPhotoList from './withPhotoList'

const HomePage = (): ReactNode => (
  <header className="page-header">
    <h1 className="title is-1">Welcome to Unsplash Photos</h1>
  </header>
)

export default withPhotoList(HomePage)
