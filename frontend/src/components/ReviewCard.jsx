import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import { Rating } from 'primereact/rating'

const ReviewCard = ({ review }) => {
  const header = (
    <div className='flex flex-row gap-3'>
      <span className='capitalize'>{review.createdBy.name}</span>
      <Rating value={review.rating} cancel={false} readOnly />
    </div>
  )
  return (
    <Panel header={header} className='w-full'>
      <span className='text-400 text-sm'>{review.createdBy.email}</span>
      <p>{review.comment}</p>
    </Panel>
  )
}

export default ReviewCard
