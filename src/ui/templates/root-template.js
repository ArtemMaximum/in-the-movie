import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


export const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const RootTemplate = ({ children }) => (
  <RootWrapper>
    {children}
  </RootWrapper>
)

RootTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

RootTemplate.defaultProps = {}
