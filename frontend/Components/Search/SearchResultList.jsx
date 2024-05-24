import React from 'react'
import './SearchResultList.css'
import { SearchResult } from './SearchResult'
import { Link } from 'react-router-dom'
import Item from '../Item/Item'
const SearchResultList = ({results}) => {
 
  return (
    <div className='result-list'>
        {
            results.map((result,id) => {
              //console.log("This is my id: ",id)
              // {`http://localhost:4000/images/product_1713854487134.png`}
               // return <Link to='/order-summary' className='buttonSearch'><SearchResult result = {result} key = {id}/></Link>
               return (<Item 
               key={id}
               id={result.id}
               name={result.name} />)
            })
        }
    </div>
  )
}
export default SearchResultList