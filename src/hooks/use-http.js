import { useReducer, useCallback } from 'react'

function httpReducer(state, action) {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      status: 'pending',
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      data: action.payload,
      error: null,
      status: 'completed',
    }
  }
  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.payload,
      status: 'completed',
    }
  }
  return state
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    error: null,
    status: startWithPending ? 'pending' : null,
  })
  //useCallback避免無窮迴圈
  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: 'SEND' })
      try {
        const data = await requestFunction(requestData)

        dispatch({ type: 'SUCCESS', payload: data })
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: error.message || 'Something went wrong!',
        })
      }
    },
    [requestFunction]
  )
  return {
    sendRequest,
    ...httpState,
  }
}

export default useHttp
