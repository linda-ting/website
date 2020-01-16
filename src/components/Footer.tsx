import React from 'react'

import { P, Container } from '../shared'
import { PINK } from '../constants/colors'

export default (): React.ReactElement => (
  <footer>
    <Container>
      <P style={{ textAlign: 'center' }} opacity={0.8} sm>
        Penn Labs © {new Date().getFullYear()}. Made with{' '}
        <span style={{ color: PINK }}>&hearts;</span> in Philly.
      </P>
    </Container>
  </footer>
)
