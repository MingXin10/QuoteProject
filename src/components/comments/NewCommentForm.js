import classes from './NewCommentForm.module.css'
import useHttp from '../../hooks/use-http'
import LoadingSpinner from '../UI/LoadingSpinner'
import { useEffect, useRef } from 'react'
import { addComment } from '../../lib/api'
const NewCommentForm = (props) => {
  const { quoteId, onAddedCommentHandler } = props
  const commentRef = useRef()
  const { error, status, sendRequest } = useHttp(addComment)

  useEffect(() => {
    if (status === 'completed' && !error) onAddedCommentHandler()
  }, [onAddedCommentHandler, status, error]) //onAddedCommentHandler當dependency，Comments的必須用uesCallback，不然會無窮迴圈

  const sendCommentHandler = (event) => {
    event.preventDefault()
    const data = commentRef.current.value
    sendRequest({ commentData: { text: data }, quoteId: quoteId })
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control}>
        <label htmlFor="comment">你的評論</label>
        <textarea name="comment" id="comment" rows="5" ref={commentRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">送出評論</button>
      </div>
    </form>
  )
}

export default NewCommentForm
