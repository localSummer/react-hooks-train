import React, { createContext, useEffect, useMemo, useState } from 'react'
import { createHashHistory as createHistory } from 'history'

export const RouterContext = createContext()
/** 为外界提供路由监听扩展功能 */
export let rootHistory = null

const Router = (props) => {
  const history = useMemo(() => {
    rootHistory = createHistory()
    return rootHistory
  }, [])

  const [location, setLocation] = useState(history.location)

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setLocation(location)
    })
    return () => {
      unlisten && unlisten()
    }
  }, [history])

  return (
    <RouterContext.Provider
      value={{
        history,
        location,
        match: { path: '/', url: '/', params: {}, isExact: location.pathname === '/' },
      }}
    >
      {props.children}
    </RouterContext.Provider>
  )
}

export default Router
