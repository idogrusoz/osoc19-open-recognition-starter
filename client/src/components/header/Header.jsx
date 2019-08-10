import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../search/Search'
import SignInOut from './SignInOut'
import logo from './logo.svg'

function Header(props) {
  return (
    <div className='header'>
      <div className='left-header'>
        <img
          className='header-logo'
          src={logo}
          alt='Logo'
          width='70px'
          height='70px'
          padding='50px'
          margin='50px'
        />
        <h2 className='banner'>OpenTrust</h2>
      </div>
      {props.width === 'no mobile' ? (
        <div className='search-element'>
          <Search searchFn={props.searchFn} />
        </div>
      ) : null}
      <div className='right-header'>
        <ul className='navlinks'>
          <SignInOut class={{ classname: 'rect-button-on-white' }} />
          {localStorage.getItem('id') ? null : (
            <Link className='linksss' to='/register'>
              <button className='rect-button-on-white' variant='info'>
                Register
              </button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header
