import classes from './NoQuotesFound.module.css'
import { Link } from 'react-router-dom'

const NoQuotesFound = () => {
  return (
    <div className={classes.noQuotes}>
      <p>沒有任何的Quote</p>
      <Link to="/new-quote" className="btn">
        要不要新增一個？
      </Link>
    </div>
  )
}

export default NoQuotesFound
