import React from 'react'
import { render } from '@testing-library/react'
import Empty from './Empty'

test.only('show empty test', () => {
  const renderApi = render(<Empty />)
  expect(renderApi.getByText('还没有创建部门')).toBeInTheDocument()
})
