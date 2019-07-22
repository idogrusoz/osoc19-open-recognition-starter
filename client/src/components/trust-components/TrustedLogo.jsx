import React, { Component } from 'react'
import  { Button } from 'react-bootstrap'
import or from './or.svg'

export default class TrustedLogo extends Component {

    render() {
        return(
            <div>
            <img 
            src={or} 
            alt="open-recognition"
            width="70px"
            height="70px"
            />
             <br/>
            <button variant='danger' width='20px' style={{backgroundColor:'#ee6e73', color:'white'}}>Cancel</button> 
            </div>
        )
    }
}