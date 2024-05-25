import React from 'react'
import './SearchResult.css'
export const SearchResult = ({result}) => {
  return (
    <div className='search-result'>{result.name}</div>
  )
}
