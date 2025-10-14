import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { Message } from 'primereact/message'
import { Rating } from 'primereact/rating'
import { Button } from 'primereact/button'
import useReviewDialog from '../hook/useReviewDialog'
import useSubmitReview from '../hook/useSubmitReview'

const AddReviewDialog = () => {
  const { restaurantId, setRestaurantId, showDialog, setShowDialog } =
    useReviewDialog()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState(null)

  const submitReview = useSubmitReview()

  const reset = () => {
    setShowDialog(false)
    setRating(0)
    setComment('')
    setRestaurantId(null)
    setError(null)
  }

  const submit = async () => {
    setError(null)
    submitReview.mutate(
      { restaurantId, payload: { rating, comment } },
      {
        onError: (err) => {
          setError({ message: err.message || 'Failed to post review' })
        },
        onSuccess: () => {
          reset()
        },
      }
    )
  }

  const footer = (
    <div>
      <Button
        label='Cancel'
        onClick={() => setShowDialog(false)}
        className='p-button-text'
      />
      <Button
        label='Submit'
        onClick={submit}
        loading={submitReview.isLoading}
        disabled={rating < 1}
      />
    </div>
  )

  return (
    <Dialog
      header='Add review'
      visible={showDialog}
      onHide={() => {
        if (!showDialog) return
        setShowDialog(false)
      }}
      footer={footer}
      style={{ width: '30rem' }}
      draggable={false}
    >
      <div className='flex flex-column gap-3'>
        {error && <Message severity='error' text={error.message} />}
        <div>
          <b>Rating</b>
          <div>
            <Rating
              value={rating}
              onChange={(e) => setRating(e.value)}
              cancel={false}
            />
          </div>
        </div>
        <div className='flex flex-column'>
          <b>Comment (Optional)</b>
          <InputTextarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoResize
            rows={5}
            cols={30}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default AddReviewDialog
