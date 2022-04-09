import classes from './QuoteItem.module.css'
import { Link } from 'react-router-dom'

const QuoteItem = (props) => {
  const { id, author, text } = props.quote

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{text}</p>
        </blockquote>
        <figcaption>{author}</figcaption>
      </figure>
      <Link to={`/quotes/${id}`} className="btn">
        看詳細內容
      </Link>
    </li>
  )
}

export default QuoteItem
