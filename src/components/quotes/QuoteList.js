import classes from './QuoteList.module.css'
import QuoteItem from './QuoteItem'
import { useHistory, useLocation } from 'react-router-dom'

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1
    } else {
      return quoteA.id < quoteB.id ? 1 : -1
    }
  })
}
const QuoteList = (props) => {
  const quotes = props.quote
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isSortingAscending = queryParams.get('sort') === 'asc'
  sortQuotes(quotes, isSortingAscending)
  const changeSortingHandler = () => {
    // history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'))
    // history.push(
    //   `${location.pathname}?sort=${isSortingAscending ? 'desc' : 'asc'}`
    // )

    //或是改用物件方式寫
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
    })
  }
  return (
    <>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          切換 {isSortingAscending ? 'Descending' : ' Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {quotes.map((quote) => (
          <QuoteItem quote={quote} key={quote.id} />
        ))}
      </ul>
    </>
  )
}

export default QuoteList
