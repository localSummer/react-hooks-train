import { useContext } from 'react'
import { RouterContext } from './Router'

const useLocation = () => {
  return useContext(RouterContext).location
}

export default useLocation
