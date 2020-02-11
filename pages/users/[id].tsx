import React, {useState} from 'react'
import axios from 'axios'
import Link from "next/link"

const UserProfile = function(props: any) {
    const {user} = props

    return (
        <div>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          <img src={user.imageUrl}/>  
          <p>{user.email}</p>
          <h2>Interested Listings:</h2>
          {user.trips.map((trip:any) => {
              if (trip.status === "pending") {
                  const interestedListing = user.listings.filter((listing:any) => listing.id === trip.listingId)
                  return (
                    <Link href={`/listings/${interestedListing[0].id}`}>
                        <div>{interestedListing[0].name}</div>
                    </Link>
                  )
              }
          })}
        </div>
    )
}

UserProfile.getInitialProps = async(context:any) => {
    const id = context.query.id
    const res = await axios.get(`http://localhost:3000/api/users/${id}`)
    return { user: res.data }
}

export default UserProfile;