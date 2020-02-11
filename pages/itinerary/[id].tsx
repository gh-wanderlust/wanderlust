import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import {User} from '../../server/db/models/interfaces'

const Itinerary = function(props:any) {
    // console.log("PROPS IN TRIP: ", props.trip)
    const { trip } = props;
 
    return (
        <div>
            <h1>{trip.listing.city}</h1>
            <h3>{trip.dateFrom} - {trip.dateTo}</h3>
            <p>{trip.listing.description}</p>
            <p>Going with:</p>
            {trip.users.map((user: User) => {
                return <Link key={user.id} href={`/users/${user.id}`}><img src={user.imageUrl}/></Link>
            })}
        </div>
    )
}

Itinerary.getInitialProps = async (context: any) => {
    let tripId = context.query.id

    if (tripId) {
        const res = await axios.get(`http://localhost:3000/api/trips/${tripId}?users=true&listings=true`);
        return { trip: res.data}
    } 
};

export default Itinerary