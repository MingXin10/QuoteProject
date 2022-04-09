import { useEffect } from 'react'
import QuoteList from '../components/quotes/QuoteList'
import { getAllQuotes } from '../lib/api'
import useHttp from '../hooks/use-http'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import NoQuotesFound from '../components/quotes/NoQuotesFound'
const AllQuotes = () => {
  const { data, error, status, sendRequest } = useHttp(getAllQuotes, true) //第二參數true沒放，會先拿到data===null、status===null，導致沒有LoadingSpinner→QuoteList裡面的quotes===null→執行array語法會報錯

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className="centered focused">{error}</p>
  }

  if (status === 'completed' && (!data || data.length === 0)) {
    return <NoQuotesFound />
  }

  return <QuoteList quote={data} />
}

export default AllQuotes
