import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.css'


// export const RootWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `

export const RootTemplate = ({ sidebar, children }) => (
  <Container>
    <Row>
      <Col md={3}>
        {sidebar}
      </Col>
      <Col md={9}>
        {children}
      </Col>
    </Row>
  </Container>
)

RootTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

RootTemplate.defaultProps = {}

export default [RootTemplate]
