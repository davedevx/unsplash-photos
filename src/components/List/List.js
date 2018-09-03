// @flow

import React, { type Node as ReactNode } from 'react'

import type { Photo } from '../../types'
import './List.css'

type Props = {
  photos: Photo[],
}

const PhotoItem = (photo: Photo, index: number) => (
  <div key={index} className="column is-4">
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3 image-item">
          <a href={photo.links.html} target="_blank" rel="noopener noreferrer" title={photo.description}>
            <img src={photo.urls.regular} alt={photo.description} />
          </a>
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          {photo.description}
        </div>
      </div>
    </div>
  </div>
)

const List = (props: Props): ReactNode => {
  const { photos } = props

  return photos && photos.length > 0 && (
    <div className="columns is-multiline" style={{ marginTop: '1em' }}>
      {photos.map(PhotoItem)}
    </div>
  )
}

export default List
