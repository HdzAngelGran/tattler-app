import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'

const Searchbar = (props) => {
  const { name, setName, cuisine, setCuisine, setShowDialog } = props

  const cuisines = [
    { name: 'Mexican', code: 'Mexican' },
    { name: 'Italian', code: 'Italian' },
    { name: 'Ice Cream', code: 'Ice Cream' },
    { name: 'American', code: 'American' },
    { name: 'Bagels', code: 'Bagels' },
    { name: 'Jewish', code: 'Jewish' },
    { name: 'Chinese', code: 'Chinese' },
    { name: 'Delicatessen', code: 'Delicatessen' },
    { name: 'Chicken', code: 'Chicken' },
    { name: 'Pizza', code: 'Pizza' },
    { name: 'Continental', code: 'Continental' },
    { name: 'Caribbean', code: 'Caribbean' },
    { name: 'Donuts', code: 'Donuts' },
    { name: 'Bakery', code: 'Bakery' },
    { name: 'Turkish', code: 'Turkish' },
    { name: 'Hamburgers', code: 'Hamburgers' },
    { name: 'Irish', code: 'Irish' },
    { name: 'German', code: 'German' },
    { name: 'Steak', code: 'Steak' },
    { name: 'French', code: 'French' },
    { name: 'Polish', code: 'Polish' },
    { name: 'Latin', code: 'Latin' },
  ]

  return (
    <nav className='w-full flex flex-column md:flex-row justify-content-center align-items-stretch gap-2 mb-4'>
      <IconField iconPosition='left' className='w-full md:w-auto'>
        <InputIcon className='pi pi-search'></InputIcon>
        <InputText
          className='w-full md:w-auto h-full'
          placeholder='Search by restaurant name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </IconField>
      <Dropdown
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        options={cuisines}
        optionLabel='name'
        placeholder='Select a Cuisine'
        className='w-full md:w-14rem'
        showClear
      />
      <Button
        label='New Restaurant'
        className='mr-2 w-full md:w-auto'
        onClick={() => setShowDialog(true)}
      />
    </nav>
  )
}

export default Searchbar
