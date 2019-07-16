import React, { Component } from 'react'
import Header from '../header/Header'
import LandingImage from '../landing/LandingImage'

export default class Landing extends Component {
    render() {
        return(
            <div>
                <Header />
                <LandingImage/>

            </div>
        )
    }
}