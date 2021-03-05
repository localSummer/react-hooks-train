import { useState } from 'react'

const useApi = (api) => {
  const [state, setState] = useState({
    loading: false,
    response: null,
    error: null,
  })

  const fetchResource = async (...params) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }))
    try {
      let { data: response } = await api(...params)
      setState((prevState) => ({
        ...prevState,
        response,
      }))
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error,
      }))
    }
    setState((prevState) => ({
      ...prevState,
      loading: false,
    }))
  }

  return {
    ...state,
    fetchResource,
  }
}

export default useApi
