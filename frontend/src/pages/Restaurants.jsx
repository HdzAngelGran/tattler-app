import { useState } from 'react'
import { Message } from 'primereact/message'
import { Skeleton } from 'primereact/skeleton'
import { Paginator } from 'primereact/paginator'
import RestaurantCard from '../components/RestaurantCard'
import useRestaurantsList from '../hook/useRestaurantsList'
import useFilters from '../hook/useFilters'
import Searchbar from '../components/Searchbar'
import RestaurantInfo from '../components/RestaurantInfo'
import AddReviewDialog from '../components/AddReviewDialog'

const Restaurants = () => {
  const [first, setFirst] = useState(0)

  const {
    page,
    setPage,
    rows,
    setRows,
    name,
    setName,
    cuisine,
    setCuisine,
    filters,
  } = useFilters()

  const { data = {}, isLoading, isError } = useRestaurantsList(filters)

  const [showModal, setShowModal] = useState(false)
  const [restaurantId, setRestaurantId] = useState(null)

  const { restaurants = [], pagination = {} } = data

  const onPageChange = (event) => {
    setPage(event.page)
    setFirst(event.first)
    setRows(event.rows)
  }

  const showRestaurantInfo = (id) => {
    setRestaurantId(id)
    setShowModal(true)
  }

  return (
    <main className='my-4 w-full flex flex-column justify-content-center'>
      <AddReviewDialog />
      <RestaurantInfo
        visible={showModal}
        setVisible={setShowModal}
        restaurantId={restaurantId}
      />
      <Searchbar
        name={name}
        setName={setName}
        cuisine={cuisine}
        setCuisine={setCuisine}
      />
      {isError && <Message text='Fail to fetch restaurants' severity='error' />}
      {!isLoading && restaurants.length == 0 && <p>No restaurants found</p>}
      <div className='flex flex-row flex-wrap gap-4 justify-content-center'>
        {isLoading &&
          [...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              className='w-full md:w-25rem'
              height='30rem'
            ></Skeleton>
          ))}
        {!isLoading &&
          restaurants.length > 0 &&
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              data={restaurant}
              onClickInfo={showRestaurantInfo}
            />
          ))}
      </div>
      <div className='mt-4 card'>
        <Paginator
          first={first}
          page={page}
          rows={rows}
          totalRecords={pagination?.total}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />
      </div>
    </main>
  )
}

export default Restaurants
