import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getListings } from '../store/store'

const Listings = (props: any) => {
    console.log("PROPS:", props)
        return (
            <div>
            <p>Listings</p>
            </div>
        )
}

const mapStateToProps = (state: any) => {
    return {
        data: state
    }
}

Listings.getInitialProps = async function({ store }: any){
    // const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman');
    // console.log(res)

    // return res
    await store.dispatch(getListings())
    console.log("HELLO")
}

export default connect(mapStateToProps, null)(Listings)