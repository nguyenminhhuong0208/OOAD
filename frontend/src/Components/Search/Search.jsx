
import React, { useEffect, useState } from "react";

const Search = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const search_parameters = Object.keys(Object.assign({}, ...data));
  //console.log("This is my search_parameter: "+search_parameters)
  function search(data) {
    return data.filter((data) =>
      search_parameters.some((parameter) =>
        data[parameter].toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  return (
    <div className="container">
      <center>
        <h1>Search component in ReactJS</h1>
      </center>
      <div className="input-box">
        <input
          type="search"
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search user"
        />
      </div>

      {/* Conditionally render results */}
      <center>
        {query !== "" && 
          search(data).map((dataObj) => (
            <div className="box" key={dataObj.id}> 
              <div className="card">
                <div className="category">@{dataObj.username}</div>
                <div className="heading">
                  {dataObj.name}
                  <div className="author">{dataObj.email}</div>
                </div>
              </div>
            </div>
          ))
        }
      </center>
    </div>
  );
}

export default Search;
