import classes from './CommentItem.module.css'

const CommentItem = (props) => {
  const { text } = props
  return (
    <li className={classes.item}>
      <p>{text}</p>
    </li>
  )
}

export default CommentItem
