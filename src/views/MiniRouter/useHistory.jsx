import { useContext } from 'react'
import { RouterContext } from './index'

const useHistory = () => {
  return useContext(RouterContext).history
}

export default useHistory
