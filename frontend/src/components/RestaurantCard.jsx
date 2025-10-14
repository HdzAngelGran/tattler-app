import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Chip } from 'primereact/chip'
import { Rating } from 'primereact/rating'
import { getPriceSigns } from '../utils/priceTransform'
import AddReviewDialog from './AddReviewDialog'
import useReviewDialog from '../hook/useReviewDialog'

const RestaurantCard = ({ data, onClickInfo }) => {
  const { setRestaurantId, setShowDialog } = useReviewDialog()

  const showAddReview = () => {
    setShowDialog(true)
    setRestaurantId(data._id)
  }

  const header = (
    <img
      src={`https://picsum.photos/id/${data.image}/300/200`}
      alt={data.name}
      style={{ borderRadius: '6px 6px 0 0' }}
    />
  )
  const subTitle = (
    <Rating value={data?.averageRating || 0} cancel={false} readOnly />
  )

  const footer = (
    <>
      <Button
        label='More info'
        className='mr-2'
        onClick={() => onClickInfo(data._id)}
      />
      <Button label='Add review' text onClick={showAddReview} />
    </>
  )

  return (
    <Card
      header={header}
      title={data.name}
      subTitle={subTitle}
      footer={footer}
      className='w-full md:w-25rem'
    >
      <div>
        <Chip label={data.cuisine} className='mr-2' />{' '}
        {getPriceSigns(data.priceRange)}
      </div>
      <p>
        {data.address.city} {data.address.state} {data.address.zipCode}
      </p>
      <p>{data.description}</p>
    </Card>
  )
}

export default RestaurantCard
