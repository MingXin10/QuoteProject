import classes from './Comments.module.css'
import useHttp from '../../hooks/use-http'
import { getAllComments } from '../../lib/api'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../UI/LoadingSpinner'
import CommentsList from './CommentsList'
import NewCommentForm from './NewCommentForm'
const Comments = () => {
  const params = useParams()
  const quoteId = params.quoteId
  const { data, error, status, sendRequest } = useHttp(getAllComments)
  const [showAddingComment, setShowAddingComment] = useState(false)

  const toggle = () => {
    setShowAddingComment(true)
  }

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  const onAddedCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  let comments

  if (status === 'pending') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === 'completed' && data.length > 0) {
    comments = <CommentsList comments={data} />
  }

  if (status === 'completed' && data.length === 0) {
    comments = <p className="centered">目前沒有評論，要不要留一個？</p>
  }

  if (error) {
    return <p className="centered focused">{error}</p>
  }

  return (
    <section className={classes.comments}>
      <h2>用戶評論</h2>
      {!showAddingComment && (
        <button className="btn" onClick={toggle}>
          新增評論
        </button>
      )}
      {showAddingComment && (
        <NewCommentForm onAddedCommentHandler={onAddedCommentHandler} quoteId={quoteId} />
      )}
      {comments}
    </section>
  )
}

export default Comments
