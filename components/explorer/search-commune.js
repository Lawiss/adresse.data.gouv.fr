import React, {useState, useCallback, useEffect} from 'react'
import Router from 'next/router'
import {debounce} from 'lodash'
import FaSearch from 'react-icons/lib/fa/search'

import {search} from '../../lib/explore/api'
import {useInput} from '../../hooks/input'

import Section from '../section'
import SearchInput from '../search-input'
import Notification from '../notification'
import renderAddok from '../search-input/render-addok'
import BetaRibbon from '../beta-ribbon'

const Explorer = () => {
  const [input, setInput] = useInput('')
  const [results, setResults] = useState([])
  const [orderResults, setOrderResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSelect = feature => {
    const {citycode, id, housenumber, type} = feature.properties
    const streetCode = type === 'municipality' ? null : id.split('-')[1]

    let href = ''
    let as = ''

    if (type === 'municipality') {
      href = `/explore/commune?codeCommune=${citycode}`
      as = `/explore/commune/${citycode}`
    } else if (type === 'street') {
      href = `/commune/voie?codeVoie=${streetCode}`
      as = `/explore/commune/${citycode}/voie/${streetCode}`
    } else if (type === 'housenumber') {
      href = `/explore/commune/voie?codeCommune=${citycode}&codeVoie=${streetCode}&numero=${housenumber}`
      as = `/explore/commune/${citycode}/voie/${streetCode}/numero/${housenumber}`
    }

    Router.push(href, as)
  }

  const handleSearch = useCallback(debounce(async input => {
    try {
      const results = await search(input)
      setResults(results.features.splice(0, 5) || [])
    } catch (err) {
      setError(err)
    }

    setLoading(false)
  }, 300), [])

  const getFeatureValue = feature => {
    return feature.header ? feature.header : feature.properties.name
  }

  useEffect(() => {
    if (results && results.length > 0) {
      const orderResults = []
      results.map(feature => {
        if (!orderResults.find(item => item.header === feature.properties.type)) {
          orderResults.push({
            header: feature.properties.type
          })
        }

        return orderResults.push(feature)
      })

      setOrderResults(orderResults)
    }
  }, [results])

  useEffect(() => {
    if (input) {
      setResults([])
      setLoading(true)
      setError(null)
      handleSearch(input)
    }
  }, [handleSearch, input])

  return (
    <Section background='color'>
      <div className='beta'>
        <h2><FaSearch /> Rechercher une commune, une voie ou une adresse</h2>
        <BetaRibbon />
      </div>

      <div className='input'>
        <SearchInput
          value={input}
          results={orderResults}
          loading={loading}
          placeholder='Exemple : place du capitole toulouse'
          onSelect={handleSelect}
          onSearch={setInput}
          renderItem={renderAddok}
          getItemValue={getFeatureValue} />
      </div>

      {error &&
        <div className='error'>
          <Notification message={error.message} type='error' />
        </div>}

      <style jsx>{`
          .error {
            margin: 1em 0;
          }

          .beta {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .beta h2 {
            margin-right: 45px;
          }
        `}</style>
    </Section>
  )
}

export default Explorer
