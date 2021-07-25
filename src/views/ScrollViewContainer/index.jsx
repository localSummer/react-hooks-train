import React, { useEffect, useState } from 'react'
import ScrollItem from './ScrollItem'

const ScrollViewContainer = () => {
  const [data, setData] = useState({
    list: [],
    page: 0,
    pageCount: 1,
  })

  /* 请求数据 */
  const getData = async () => {
    if (data.page === data.pageCount) return console.log('没有数据了～')
    const res = await fetchData(data.page + 1)
    if (res.code === 0)
      setData({
        ...res,
        list: res.page === 1 ? res.list : data.list.concat(res.list),
      })
  }

  useEffect(() => {
    getData()
  })

  const handerScrolltolower = () => {
    console.log('scroll 已经到底部了')
    getData()
  }

  return (
    <ScrollView
      data={data}
      component={ScrollItem} /* Item 渲染的单元组件 */
      scrolltolower={handerScrolltolower}
      scroll={() => {}}
    />
  )
}

export default ScrollViewContainer
