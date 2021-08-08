import React from 'react'
import UnitTest from './index'
import { render } from '@testing-library/react'

test('should show unitTest text', () => {
  const renderApi = render(<UnitTest />)
  expect(renderApi.getByText('unitTest')).toBeInTheDocument()
})
