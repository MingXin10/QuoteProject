import CommentItem from './CommentItem'
import classes from './CommentsList.module.css'

const CommentsList = (props) => {
  const comments = props.comments
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <CommentItem text={comment.text} key={comment.id} />
      ))}
    </ul>
  )
}

export default CommentsList
