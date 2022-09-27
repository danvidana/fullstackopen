import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchTerm, handler }) => {
  return (
    <div>
      find countries <input value={searchTerm} onChange={handler} />
    </div>
  )
}

const Country = ({ name, buttonHandler }) => {
  return (
    <div>
    {name}
    <button onClick={() => buttonHandler(name)} >
      show
    </button>
    </div>
  )
}

const Languages = ({ languages }) => {
  return (
    <ul>
        {Object.values(languages).map(language =>
            <li key={language}> {language} </li>
          )
        }
    </ul>
  )
}

const WeatherSection = ({country}) => {
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>temperature {}</div>
    </div>
  )
}

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      <WeatherSection country={country} />
    </div>
  )
}

const CountriesList = ({ countries, buttonHandler }) => {
  if(countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }else if(countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <Country key={country.name.common} name={country.name.common} buttonHandler={buttonHandler}/>
        )}
      </div>
    )
  }else if(countries.length === 1) {
    return (
      <CountryDetails country={countries[0]}/>
    )
  }
}

function App() {
  const [newSearch, setNewSearch] = useState('')
  const [filtering, setFiltering] = useState(false)
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

  const handleShowButton = (name) => {
    console.log("handleShowButton", name)
    setNewSearch(name)
  }

  const countriesToShow = filtering
    ? allCountriesData.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    : ""

  return (
    <div>
      <Filter 
        searchTerm={newSearch}
        handler={handleSearchChange}
      />
      <CountriesList countries={countriesToShow} buttonHandler={handleShowButton} />
    </div>
  );
}

export default App;
