import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AllQuotes from './pages/AllQuotes'
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'

const NewQuote = React.lazy(() => import('./pages/NewQuote')) //只有在需要用到NewQuote才會evaluate，連到Add a Quote頁面會發出一個fetch抓取該頁JS資料
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default App
