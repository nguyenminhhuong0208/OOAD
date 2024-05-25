import React from 'react'
import './SearchBar.css'
import {FaSearch} from 'react-icons/fa'

import { useState } from 'react'
import SearchResultList from './SearchResultList'


const SearchBar = ({setResult, result}) => {
    
    const [input,setInput] = useState("")

    const fetchData = (value) =>{
        // https://jsonplaceholder.typicode.com/users
        fetch("http://localhost:4000/allproducts")
        .then((res) => res.json())
        .then((json)=>{
            // return true if match the text in input
            const result = json.filter((user) => {
                // if the value is empty we wont render anything
                return value && user && user.id && user.name && user.name.toLowerCase().includes(value)

            });
            setResult(result)
        });
    }
    const handleChange = (value) =>
    {
        setInput(value)
        fetchData(value)
    }

return (
    <div>
        <div className='text-search'>Search</div>
        <div className='FrameSearch'>
                <div className='input-wrapper'>
                <FaSearch id="search-icon" />
                <input placeholder='Type to search' value={input} onChange={(e) => handleChange(e.target.value)}/>
                <SearchResultList results={result}/>
                </div>  
        </div>
    </div>
    
    
  )

  
}

export default SearchBar