import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Fieldset } from 'primereact/fieldset'
import { InputTextarea } from 'primereact/inputtextarea'
import { FloatLabel } from 'primereact/floatlabel'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import useAddRestaurant from '../hook/useAddRestaurant'

const initialAddress = {
  street: '',
  city: '',
  state: '',
  zipCode: '',
  building: '',
  coord: { lat: '', lng: '' },
}

const AddRestaurantDialog = ({ showDialog, setShowDialog }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [image, setImage] = useState('')
  const [address, setAddress] = useState(initialAddress)
  const [error, setError] = useState(null)

  const addRestaurant = useAddRestaurant()

  const reset = () => {
    setShowDialog(false)
    setName('')
    setDescription('')
    setCuisine('')
    setPriceRange('')
    setImage('')
    setAddress(initialAddress)
    setError(null)
  }

  const submit = () => {
    setError(null)

    const payload = {
      name,
      description,
      cuisine,
      priceRange: priceRange ? Number(priceRange) : null,
      image,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        building: address.building,
        coord: {
          lat: address.coord.lat ? Number(address.coord.lat) : 0,
          lng: address.coord.lng ? Number(address.coord.lng) : 0,
        },
      },
    }

    addRestaurant.mutate(payload, {
      onError: (err) => {
        setError({ message: err.message || 'Failed to add restaurant' })
      },
      onSuccess: () => {
        reset()
      },
    })
  }

  const footer = (
    <div>
      <Button
        label='Cancel'
        onClick={() => setShowDialog(false)}
        className='p-button-text'
      />
      <Button
        label='Create'
        onClick={submit}
        loading={addRestaurant.isLoading}
        disabled={!name || !cuisine || !priceRange || !address.street}
      />
    </div>
  )

  return (
    <Dialog
      header='New Restaurant'
      visible={showDialog}
      onHide={() => setShowDialog(false)}
      footer={footer}
      style={{ width: '40rem' }}
      draggable={false}
    >
      <div className='p-4 flex flex-column gap-3'>
        {error && <Message severity='error' text={error.message} />}
        <Fieldset legend='General'>
          <div className='grid'>
            <div className='col-12 mt-3'>
              <FloatLabel>
                <InputText
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full'
                />
                <label htmlFor='name'>Name</label>
              </FloatLabel>
            </div>
            <div className='col-12 md:col-6 mt-3'>
              <FloatLabel>
                <InputText
                  id='cuisine'
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className='w-full'
                />
                <label htmlFor='cuisine'>Cuisine</label>
              </FloatLabel>
            </div>
            <div className='col-12 md:col-6 mt-3'>
              <FloatLabel>
                <InputText
                  id='priceRange'
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className='w-full'
                />
                <label htmlFor='priceRange'>Price</label>
              </FloatLabel>
            </div>
            <div className='col-12 mt-3'>
              <FloatLabel>
                <label htmlFor='description'>Description</label>
                <InputTextarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className='w-full'
                  autoResize
                />
              </FloatLabel>
            </div>
          </div>
        </Fieldset>
        <Fieldset legend='Address'>
          <div className='grid'>
            <div className='col-12 mt-3'>
              <FloatLabel>
                <InputText
                  id='street'
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className='w-full'
                />
                <label htmlFor='street'>Street</label>
              </FloatLabel>
            </div>
            <div className='col-12 md:col-6 mt-3'>
              <FloatLabel>
                <InputText
                  id='building'
                  value={address.building}
                  onChange={(e) =>
                    setAddress({ ...address, building: e.target.value })
                  }
                  className='w-full'
                />
                <label htmlFor='building'>Building</label>
              </FloatLabel>
            </div>
            <div className='col-12 md:col-6 mt-3'>
              <FloatLabel>
                <InputText
                  id='city'
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className='w-full'
                />
                <label htmlFor='city'>City</label>
              </FloatLabel>
            </div>
            <div className='col-12 md:col-6 mt-3'>
              <FloatLabel>
                <InputText
                  id='state'
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  className='w-full'
                />
                <label htmlFor='state'>State</label>
              </FloatLabel>
            </div>
            <div className='col-12 md:col-6 mt-3'>
              <FloatLabel>
                <InputText
                  id='zipCode'
                  value={address.zipCode}
                  onChange={(e) =>
                    setAddress({ ...address, zipCode: e.target.value })
                  }
                  className='w-full'
                />
                <label htmlFor='zipCode'>Zip code</label>
              </FloatLabel>
            </div>
          </div>
        </Fieldset>
      </div>
    </Dialog>
  )
}

export default AddRestaurantDialog
