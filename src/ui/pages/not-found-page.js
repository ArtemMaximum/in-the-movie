import React from 'react'
import { Link } from 'react-router-dom'

import { RootTemplate } from '../templates'


export const NotFoundPage = () => (
  <RootTemplate>
    <h2
      className="dsafd"
    >Page not found
    </h2>
    <p>Go to
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link to="/" href="#">home</Link> and repeat
    </p>
  </RootTemplate>
)

export default [NotFoundPage]
