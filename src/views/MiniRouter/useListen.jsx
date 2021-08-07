import { useEffect } from 'react'
import { rootHistory } from './Router'

const useListen = (cb) => {
  useEffect(() => {
    if (!rootHistory) return () => {}
    const unlisten = rootHistory.listen((location) => {
      cb && cb(location)
    })
    return () => {
      unlisten && unlisten()
    }
  }, [cb])
}

export default useListen
