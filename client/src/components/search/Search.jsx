import React from 'react'

function Search(props) {
  return (
    <div className='search'>
      <input id='searchInput' />
      <button
        className='rect-button-on-white'
        onClick={() =>
          props.searchFn(document.getElementById('searchInput').value)
        }
      >
        Search
      </button>
    </div>
  )
}

export default Search
