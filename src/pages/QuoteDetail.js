import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import { useParams, useRouteMatch, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Comments from '../components/comments/Comments'

const QuoteDetail = () => {
  const match = useRouteMatch()
  const params = useParams()
  const id = params.quoteId
  const { data, error, status, sendRequest } = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(id)
  }, [sendRequest, id])

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

  if (!data.text) return <p>No quote found</p>

  return (
    <>
      <HighlightedQuote data={data} />
      {/* 下面連結一旦連到comment，div就會消失=>能不用寫狀態就做到條件式渲染 */}
      {/* <Route path={`/quotes/${params.quoteId}`} exact> */}
      {/* 改用match的方式較有彈性，如果父層的Route path改變，子層Route path就不需自己手動修改 */}
      <Route path={`${match.path}`} exact>
        <div className="centered">
          {/* <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}> */}
          <Link className="btn--flat" to={`${match.url}/comments`}>
            看Comment
          </Link>
        </div>
      </Route>
      {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  )
}

export default QuoteDetail
