import React, { Component } from 'react'
import LandingImage from '../landing/LandingImage'
import Search from '../search/Search'

export default class Landing extends Component {
  displaySearch = () => {
    const searchBar = document.getElementById('searchGroup')
    searchBar.style.removeProperty('display')
    const searchButton = document.getElementById('showSearch')
    searchButton.style.display = 'none'
  }

  searchFn = async username => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/search/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data[0].login) {
          this.props.history.push(`/profile/${username}`)
        } else {
          this.props.history.push(`/`)
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <div
          id='searchGroup'
          className='landing-search'
          style={{ display: 'none' }}
        >
          <Search searchFn={this.searchFn} />
        </div>
        <div className='landing-search-button-bar'>
          <button
            className='rect-button'
            style={{ width: '160px' }}
            id='showSearch'
            onClick={this.displaySearch}
          >
            Search For A User
          </button>
        </div>
        <LandingImage />
      </div>
    )
  }
}
