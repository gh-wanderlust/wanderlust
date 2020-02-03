import React from 'react'

interface User {
    firstName: string,
    lastName: string,
    imageUrl: string
}

interface Listing {
    name: string,
    description: string,
    address: string,
    city: string,
    country: string
}

interface TravelDate {
    dateFrom: Date,
    dateTo: Date
}

const dummyUsers: Array<User> = [
    {
        firstName: "Furby",
        lastName: "McPherbison",
        imageUrl: "https://placekitten.com/600/400"
    },
    {
        firstName: "Furbina",
        lastName: "McPherbison",
        imageUrl: "https://placekitten.com/600/400"
    },
    {
        firstName: "Dave",
        lastName: "Jones",
        imageUrl: "https://placekitten.com/600/400"
    }
]

const dummyListing: Listing = {
    name: "The Furb Mansion",
    description: "The coziest retreat for Furby lovers everywhere :)",
    address: "123 Furby Lane",
    city: "Furbtrocity",
    country: "Furbtopia"
}

const dummyDate: TravelDate = {
    dateFrom: new Date(2020, 2, 14),
    dateTo: new Date(2020, 2, 17)
}

const Booking = function () {
    const listing = dummyListing;
    const users = dummyUsers;
    const date = dummyDate;

    return (
        <div>
            <div>
                <h2>You'll be staying at {listing.name}:</h2>
                <p>{listing.description}</p>
                <p>{listing.address}</p>
                <p>{listing.city}</p>
                <p>{listing.country}</p>
            </div>
            <div>Travel Dates: from {date.dateFrom.toString()} to {date.dateTo.toString()}</div>
            <div>
                Traveling with: {users.map((user: User) => {
                    return (
                        <div>
                            <p>{user.firstName + " " +user.lastName}</p>
                            <img src={user.imageUrl} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Booking