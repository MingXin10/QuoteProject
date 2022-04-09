import classes from './HighlightedQuote.module.css'

const HighlightedQuote = (props) => {
  return (
    <div className={classes.quote}>
      <p>{props.data.text}</p>
      <figcaption>{props.data.author}</figcaption>
    </div>
  )
}

export default HighlightedQuote
