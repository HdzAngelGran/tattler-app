import useRestaurant from '../hook/useRestaurant'
import useReviews from '../hook/useReviews'
import ReviewCard from './ReviewCard'
import { Chip } from 'primereact/chip'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import { Rating } from 'primereact/rating'
import { ScrollPanel } from 'primereact/scrollpanel'
import { Skeleton } from 'primereact/skeleton'
import { getPriceSigns } from '../utils/priceTransform'
import { Button } from 'primereact/button'
import useReviewDialog from '../hook/useReviewDialog'

const RestaurantInfo = ({ restaurantId, visible, setVisible }) => {
  const {
    data: restaurant = null,
    isLoading: isLoadingRestaurant,
    isError: isErrorRestaurant,
  } = useRestaurant(restaurantId)
  const {
    data: reviews = {},
    isLoading: isLoadingReview,
    isError: isErrorReview,
  } = useReviews(restaurantId)

  const { setRestaurantId, setShowDialog } = useReviewDialog()

  const showAddReview = () => {
    setShowDialog(true)
    setRestaurantId(restaurantId)
  }

  return (
    <Dialog
      header={restaurant?.name || 'Loading...'}
      visible={visible}
      style={{ width: '50vw' }}
      onHide={() => {
        if (!visible) return
        setVisible(false)
      }}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      draggable={false}
    >
      <div className='flex flex-column lg:flex-row gap-3'>
        <div className='flex flex-column gap-3'>
          {isLoadingRestaurant && (
            <Skeleton className='w-full' height='20rem' />
          )}
          {isErrorRestaurant && <p>Fail to fetch restaurant</p>}
          {!isLoadingRestaurant && !restaurant && <p>No restaurant found</p>}
          {!isLoadingRestaurant && restaurant && (
            <>
              <img
                src={`https://picsum.photos/id/${restaurant.image}/300/200`}
                alt={restaurant.name}
                style={{ borderRadius: '6px 6px 0 0' }}
              />
              <Rating
                value={restaurant.averageRating || 0}
                cancel={false}
                readOnly
              />
              <div>
                <Chip label={restaurant.cuisine} className='mr-2' />
                {getPriceSigns(restaurant.priceRange)}
              </div>
              <span>
                {restaurant.address.street} {restaurant.address.building}{' '}
                {restaurant.address.city} {restaurant.address.state}{' '}
                {restaurant.address.zipCode}
              </span>
              <span>{restaurant.description}</span>
            </>
          )}
        </div>
        <ScrollPanel className='w-full h-full lg:h-25rem'>
          <Divider align='center'>
            <div className='inline-flex align-items-center'>
              <i className='pi pi-user mr-2'></i>
              <b>Reviews</b>
            </div>
          </Divider>
          {isErrorReview && <p>Fail to fetch reviews</p>}
          {isLoadingReview && <Skeleton className='w-full' height='10rem' />}
          <div className='flex flex-column gap-3 align-items-center'>
            {!isLoadingReview && reviews.length == 0 && <p>No reviews</p>}
            {!isLoadingReview &&
              reviews.length > 0 &&
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            {!isLoadingReview && (
              <Button label='Add review' text onClick={showAddReview} />
            )}
          </div>
        </ScrollPanel>
      </div>
    </Dialog>
  )
}

export default RestaurantInfo
