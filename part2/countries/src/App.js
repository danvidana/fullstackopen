import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchTerm, handler }) => {
  return (
    <div>
      find countries <input value={searchTerm} onChange={handler} />
    </div>
  )
}

function App() {
  const [newSearch, setNewSearch] = useState('')
  const [filtering, setFiltering] = useState(false)
  const [countriesCount, setCountriesCount] =  useState(0)
  const [allCountriesData, setAllCountriesData] = useState([])

  const hook = () => {
    console.log('effect (hook)')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setAllCountriesData(response.data)
      })
  }

  useEffect(hook, [])

  const handleSearchChange = (event) => {
    if(event.target.value === '') {
      setFiltering(false)
    }else {
      setFiltering(true)
    }

    setNewSearch(event.target.value)
  }

  console.log(allCountriesData)

  const countriesToShow = filtering
    ? allCountriesData.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    : ""

  return (
    <div>
      <Filter 
        searchTerm={newSearch}
        handler={handleSearchChange}
      />
    </div>
  );
}

export default App;
