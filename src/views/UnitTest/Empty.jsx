import React from 'react'
import { Result } from '@liepin/react-bbusinesscomponents-pc'

const Empty = () => {
  return (
    <Result
      status="empty"
      className="department-list-empty"
      customArea={<p className="empty-text">还没有创建部门</p>}
    />
  )
}

export default Empty
